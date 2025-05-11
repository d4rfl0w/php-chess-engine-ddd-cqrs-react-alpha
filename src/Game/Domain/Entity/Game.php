<?php

namespace App\Game\Domain\Entity;

use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity]
#[ORM\Table(name: 'game')]
class Game
{
    public const STATE_INITIAL = 'initial';

    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(type: 'integer')]
    private ?int $id = null;

    #[ORM\Column(type: 'json')]
    private array $state = [];

    public function __construct()
    {
        $this->state = [
            'board' => self::STATE_INITIAL,
            'turn' => 'white',
        ];
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getState(): array
    {
        return $this->state;
    }

    public function setState(array $state): void
    {
        $this->state = $state;
    }

    public function makeMove(array $move): void
    {
        $this->state['turn'] = $this->state['turn'] === 'white' ? 'black' : 'white';
    }
}
