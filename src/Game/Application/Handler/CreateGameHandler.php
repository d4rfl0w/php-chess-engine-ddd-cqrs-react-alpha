<?php

namespace App\Game\Application\Handler;

use App\Game\Application\Command\CreateGameCommand;
use App\Game\Domain\Entity\Game;
use Doctrine\ORM\EntityManagerInterface;

class CreateGameHandler
{
    public function __construct(
        private EntityManagerInterface $entityManager
    ) {
    }

    public function __invoke(CreateGameCommand $command): string
    {
        $game = new Game();
        $game->setState(Game::STATE_INITIAL);

        $this->entityManager->persist($game);
        $this->entityManager->flush();

        return (string) $game->getId();
    }
}
