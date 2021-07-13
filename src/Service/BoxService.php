<?php

namespace App\Service;

use App\Entity\Box;
use App\Repository\BoxRepository;
use Doctrine\Persistence\ManagerRegistry;

class BoxService
{
    private $entityManager;
    public function __construct(ManagerRegistry $registry)
    {
        $this->entityManager = $registry->getManager('default');
    }

    public function getUserBoxes(int $userId): array
    {
        /** @var BoxRepository $boxRepository */
        $boxRepository = $this->entityManager->getRepository(Box::class);
        return $boxRepository->getUserBoxes($userId);
    }

    public function getAllAddresses(): array
    {
        /** @var BoxRepository $boxRepository */
        $boxRepository = $this->entityManager->getRepository(Box::class);
        return $boxRepository->getAllAddresses();
    }
}