<?php

namespace App\Service;

use App\Entity\UserBoxSignature;
use App\Repository\UserBoxSignatureRepository;
use Doctrine\Persistence\ManagerRegistry;
use Doctrine\Persistence\ObjectManager;

class UserBoxSignatureService
{
    private ObjectManager $entityManager;

    public function __construct(ManagerRegistry $registry)
    {
        $this->entityManager = $registry->getManager('default');
    }

    public function getSignature(int $boxId): string
    {
        /** @var UserBoxSignatureRepository $userBoxSignatureRepository */
        $userBoxSignatureRepository = $this->entityManager->getRepository(UserBoxSignature::class);
        return ($userBoxSignatureRepository->getSignature($boxId));
    }

    public function setSignature(int $boxId, string $signature)
    {
        /** @var UserBoxSignatureRepository $userBoxSignatureRepository */
        $userBoxSignatureRepository = $this->entityManager->getRepository(UserBoxSignature::class);
        $userBoxSignatureRepository->setSignature($boxId, $signature);
    }
}