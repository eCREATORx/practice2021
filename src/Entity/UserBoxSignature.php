<?php

namespace App\Entity;

use App\Repository\UserBoxSignatureRepository;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass=UserBoxSignatureRepository::class)
 * @ORM\Table(name="user_box_signature")
 */
class UserBoxSignature
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

    /**
     * @ORM\Column(type="text")
     */
    public $signature;

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
