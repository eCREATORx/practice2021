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
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    public $id;

    /**
     * @ORM\Column(type="integer", name="user_id")
     */
    public $userId;

    /**
     * @ORM\Column(type="integer", name="box_id")
     */
    public $boxId;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    public $signature;

    public function getId(): ?int
    {
        return $this->id;
    }

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

    public function getSignature(): ?string
    {
        return $this->signature;
    }

    public function setSignature(?string $signature): self
    {
        $this->signature = $signature;

        return $this;
    }
}
