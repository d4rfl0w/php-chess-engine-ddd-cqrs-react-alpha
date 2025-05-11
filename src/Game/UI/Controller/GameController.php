<?php

namespace App\Game\UI\Controller;

use App\Game\Application\Command\MakeMoveCommand;
use App\Game\Application\Query\GetGameStateQuery;
use App\Game\Application\Response\BoardStateResponse;
use RuntimeException;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Messenger\MessageBusInterface;
use Symfony\Component\Messenger\Stamp\HandledStamp;
use Symfony\Component\Routing\Annotation\Route;

class GameController extends AbstractController
{
    public function __construct(
        private MessageBusInterface $commandBus,
        private MessageBusInterface $queryBus
    ) {
    }

    #[Route('/api/games/{gameId}/board', name: 'get_board', methods: ['GET'])]
    public function getBoardState(string $gameId): JsonResponse
    {
        /** @var BoardStateResponse $boardState */
        $boardState = $this->dispatchQuery(new GetGameStateQuery($gameId));

        return $this->json([
            'gameId' => $boardState->getGameId(),
            'board' => $boardState->getBoard(),
            'turn' => $boardState->getTurn(),
            'status' => $boardState->getStatus(),
        ]);
    }

    #[Route('/api/games/{gameId}/board', name: 'make_move', methods: ['POST'])]
    public function makeMove(Request $request, string $gameId): JsonResponse
    {
        $data = json_decode($request->getContent(), true);

        if (empty($data['from']) || empty($data['to'])) {
            return $this->json([
                'status' => 'error',
                'message' => 'Fields "from" and "to" are required.'
            ], Response::HTTP_BAD_REQUEST);
        }

        try {
            $command = new MakeMoveCommand($gameId, $data['from'], $data['to']);
            $this->dispatchCommand($command);
        } catch (\Throwable $e) {
            return $this->json([
                'status' => 'error',
                'message' => $e->getMessage()
            ], Response::HTTP_BAD_REQUEST);
        }

        return $this->json(['status' => 'success'], Response::HTTP_OK);
    }

    private function dispatchQuery(GetGameStateQuery $query): BoardStateResponse
    {
        $envelope = $this->queryBus->dispatch($query);

        /** @var HandledStamp|null $handledStamp */
        $handledStamp = $envelope->last(HandledStamp::class);

        if (null === $handledStamp) {
            throw new RuntimeException('Query was not handled.');
        }

        return $handledStamp->getResult();
    }

    private function dispatchCommand(MakeMoveCommand $command): void
    {
        $this->commandBus->dispatch($command);
    }
}
