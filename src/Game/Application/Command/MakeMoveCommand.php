<?php

// src/Game/Application/Command/MakeMoveCommand.php
namespace App\Game\Application\Command;

class MakeMoveCommand
{
    private $gameId;
    private $move;

    public function __construct(int $gameId, string $move)
    {
        $this->gameId = $gameId;
        $this->move = $move;
    }

    public function getGameId(): int
    {
        return $this->gameId;
    }

    public function getMove(): string
    {
        return $this->move;
    }
}