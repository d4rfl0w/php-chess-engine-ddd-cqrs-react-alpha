<?php
namespace App\Game\Application\Handler;

use App\Game\Application\Command\MakeMoveCommand;
use App\Game\Domain\Repository\GameRepository;
use App\Game\Domain\Exception\GameNotFoundException;

class MakeMoveHandler
{
    public function __construct(private GameRepository $gameRepository)
    {
    }

    public function __invoke(MakeMoveCommand $command): void
    {
        $game = $this->gameRepository->find($command->getGameId());

        if (null === $game) {
            throw new GameNotFoundException(sprintf('Game %s not found', $command->getGameId()));
        }

        $game->makeMove($command->getMove());
        $this->gameRepository->save($game);
    }
}
