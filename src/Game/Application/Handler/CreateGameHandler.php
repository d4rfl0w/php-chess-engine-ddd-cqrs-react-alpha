<?php

namespace App\Game\Application\Handler;

use App\Game\Application\Command\CreateGameCommand;
use App\Game\Domain\Entity\Game;
use App\Game\Domain\Repository\GameRepository;
use Doctrine\ORM\EntityManagerInterface;

class CreateGameHandler
{
    private $gameRepository;
    private $entityManager;

    public function __construct(GameRepository $gameRepository, EntityManagerInterface $entityManager)
    {
        $this->gameRepository = $gameRepository;
        $this->entityManager = $entityManager;
    }

    public function __invoke(CreateGameCommand $command)
    {
        $game = new Game();
        $game->setState('initial');
        $this->entityManager->persist($game);
        $this->entityManager->flush();
    }
}
