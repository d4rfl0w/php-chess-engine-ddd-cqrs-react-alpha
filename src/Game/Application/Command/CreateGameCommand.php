<?php

namespace App\Game\Application\Command;

class CreateGameCommand
{
    private $playerId;

    public function __construct(int $playerId)
    {
        $this->playerId = $playerId;
    }

    public function getPlayerId(): int
    {
        return $this->playerId;
    }
}
