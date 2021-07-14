<?php


namespace App\Service;

use App\Entity\UserBox;
use App\Repository\UserBoxRepository;
use Doctrine\Persistence\ManagerRegistry;
use Doctrine\Persistence\ObjectManager;

class UserBoxService
{
    private ObjectManager $entityManager;

    public function __construct(ManagerRegistry $registry)
    {
        $this->entityManager = $registry->getManager('default');
    }

    public function getSignature(int $boxId): string
    {
        /** @var UserBoxRepository $userBoxRepository */
        $userBoxRepository = $this->entityManager->getRepository(UserBox::class);
        return ($userBoxRepository->getSignature($boxId));
    }
}