<?php

// src/Game/Application/Handler/GetGameStateHandler.php
namespace App\Game\Application\Handler;

use App\Game\Application\Query\GetGameStateQuery;
use App\Game\Application\Response\BoardStateResponse;
use App\Game\Domain\Repository\GameRepository;

class GetGameStateHandler
{
    private $gameRepository;

    public function __construct(GameRepository $gameRepository)
    {
        $this->gameRepository = $gameRepository;
    }

    public function __invoke(GetGameStateQuery $query)
    {
        $game = $this->gameRepository->find($query->getGameId());
        if (!$game) {
            throw new \Exception('Game not found');
        }

        $state = json_decode($game->getState(), true);

        if ($state['board'] == 'initial') {
            $state['board'] = [
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

        return new BoardStateResponse(
            (string)$game->getId(),
            $state['board'], // Assuming the state is stored as JSON
            $state['turn'],
            'active'
        );
    }
}
