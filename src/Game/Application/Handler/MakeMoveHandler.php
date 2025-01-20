<?php
// src/Game/Application/Handler/MakeMoveHandler.php
namespace App\Game\Application\Handler;

use App\Game\Application\Command\MakeMoveCommand;
use App\Game\Domain\Repository\GameRepository;

class MakeMoveHandler
{
    private $gameRepository;

    public function __construct(GameRepository $gameRepository)
    {
        $this->gameRepository = $gameRepository;
    }

    public function __invoke(MakeMoveCommand $command)
    {
        $game = $this->gameRepository->find($command->getGameId());
        if (!$game) {
            throw new \Exception('Game not found');
        }

        // Dodaj logikę obsługującą ruch szachowy
        $game->makeMove($command->getMove());

        $this->gameRepository->save($game);
    }
}
