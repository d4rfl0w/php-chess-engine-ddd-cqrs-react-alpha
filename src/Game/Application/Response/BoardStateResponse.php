<?php

namespace App\Game\Application\Response;

class BoardStateResponse
{
    private string $gameId;
    private array $board;
    private string $turn;
    private string $status;

    public function __construct(string $gameId, array $board, string $turn, string $status)
    {
        $this->gameId = $gameId;
        $this->board = $board;
        $this->turn = $turn;
        $this->status = $status;
    }

    public function getGameId(): string
    {
        return $this->gameId;
    }

    public function getBoard(): array
    {
        return $this->board;
    }

    public function getTurn(): string
    {
        return $this->turn;
    }

    public function getStatus(): string
    {
        return $this->status;
    }
}
