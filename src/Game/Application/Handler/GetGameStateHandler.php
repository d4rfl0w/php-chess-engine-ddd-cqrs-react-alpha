<?php

namespace App\Game\Application\Handler;

use App\Game\Application\Query\GetGameStateQuery;
use App\Game\Application\Response\BoardStateResponse;
use App\Game\Domain\Entity\Game;
use App\Game\Domain\Repository\GameRepository;
use App\Game\Domain\Exception\GameNotFoundException;
use UnexpectedValueException;

class GetGameStateHandler
{
    public const STATUS_ACTIVE = 'active';

    public function __construct(private GameRepository $gameRepository)
    {
    }

    public function __invoke(GetGameStateQuery $query): BoardStateResponse
    {
        $game = $this->gameRepository->find($query->getGameId());

        if (null === $game) {
            throw new GameNotFoundException(sprintf('Game %s not found', $query->getGameId()));
        }

        $state = json_decode($game->getState(), true);
        if (!is_array($state) || !isset($state['board'], $state['turn'])) {
            throw new UnexpectedValueException('Invalid game state format');
        }

        if ($state['board'] === Game::STATE_INITIAL) {
            $state['board'] = $this->getInitialBoard();
        }

        return new BoardStateResponse(
            (string) $game->getId(),
            $state['board'],
            $state['turn'],
            self::STATUS_ACTIVE
        );
    }

    private function getInitialBoard(): array
    {
        return [
            ["R", "N", "B", "Q", "K", "B", "N", "R"],
            ["P", "P", "P", "P", "P", "P", "P", "P"],
            ["R", null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null],
            ["p", "p", "p", "p", "p", "p", "p", "p"],
            ["r", "n", "b", "q", "k", "b", "n", "r"]
        ];
    }
}
