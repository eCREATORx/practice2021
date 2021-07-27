<?php

namespace App\Entity;

use App\Repository\UserBoxRepository;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass=UserBoxRepository::class)
 * @ORM\Table(name="user_box")
 */
class UserBox
{
    /**
     * @ORM\Id
     * @ORM\Column(type="integer", name="user_id")
     */
    public $userId;

    /**
     * @ORM\Id
     * @ORM\Column(type="integer", name="box_id")
     */
    public $boxId;

    public function getUserId(): ?int
    {
        return $this->userId;
    }

    public function setUserId(int $userId): self
    {
        $this->userId = $userId;

        return $this;
    }

    public function getBoxId(): ?int
    {
        return $this->boxId;
    }

    public function setBoxId(int $boxId): self
    {
        $this->boxId = $boxId;

        return $this;
    }
}