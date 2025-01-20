<?php

namespace App\Game\UI\Controller;

use App\Game\Application\Response\BoardStateResponse;
use App\Game\Application\Command\MakeMoveCommand;
use App\Game\Application\Query\GetGameStateQuery;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Messenger\MessageBusInterface;
use Symfony\Component\Messenger\Stamp\HandledStamp;

class GameController extends AbstractController
{
    private MessageBusInterface $commandBus;
    private MessageBusInterface $queryBus;

    public function __construct(MessageBusInterface $commandBus, MessageBusInterface $queryBus)
    {
        $this->commandBus = $commandBus;
        $this->queryBus = $queryBus;
    }

    #[Route('/', name: 'home')]
    public function index(): Response
    {
        return $this->render('base.html.twig');
    }

    #[Route('/api/games/{gameId}/board', name: 'get_board_state', methods: ['GET'])]
    public function getBoardState(string $gameId): JsonResponse
    {
        $query = new GetGameStateQuery($gameId);

        /** @var BoardStateResponse $boardState */
        $boardState = $this->dispatchQuery($query);

        return $this->json([
            'gameId' => $boardState->getGameId(),
            'board' => $boardState->getBoard(),
            'turn' => $boardState->getTurn(),
            'status' => $boardState->getStatus(),
        ], Response::HTTP_OK);
    }

    #[Route('/api/games/{gameId}/board', name: 'make_move', methods: ['POST'])]
    public function makeMove(Request $request, string $gameId): Response
    {
        $data = json_decode($request->getContent(), true);
        $command = new MakeMoveCommand($gameId, $data['from'], $data['to']);

        $this->dispatchCommand($command);

        return $this->json(['status' => 'success']);
    }


    private function dispatchQuery(GetGameStateQuery $query): BoardStateResponse
    {
        $envelope = $this->queryBus->dispatch($query);

        // Extract the result using HandledStamp
        $handledStamp = $envelope->last(HandledStamp::class);

        if (!$handledStamp) {
            throw new \RuntimeException('Query was not handled.');
        }

        return $handledStamp->getResult(); // Return the actual result
    }


    private function dispatchCommand(MakeMoveCommand $command): void
    {
        $this->commandBus->dispatch($command);
    }
}
