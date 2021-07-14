<?php

namespace App\Service;

use App\Entity\Box;
use App\Repository\BoxRepository;
use Doctrine\Persistence\ManagerRegistry;
use Doctrine\Persistence\ObjectManager;

class BoxService
{
    private ObjectManager $entityManager;

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
}