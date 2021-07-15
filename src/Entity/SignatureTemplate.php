<?php

namespace App\Entity;

use App\Repository\SignatureTemplateRepository;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass=SignatureTemplateRepository::class)
 * @ORM\Table(name="signature_template")
 */
class SignatureTemplate
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $name;

    /**
     * @ORM\Column(type="json")
     */
    private $scheme = [];

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(string $name): self
    {
        $this->name = $name;

        return $this;
    }

    public function getScheme(): ?array
    {
        return $this->scheme;
    }

    public function setScheme(array $scheme): self
    {
        $this->scheme = $scheme;

        return $this;
    }
}
