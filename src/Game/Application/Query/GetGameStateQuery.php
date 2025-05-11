<?php

namespace App\Game\Application\Query;

class GetGameStateQuery
{
    private $gameId;

    public function __construct(int $gameId)
    {
        $this->gameId = $gameId;
    }

    public function getGameId(): int
    {
        return $this->gameId;
    }
}
