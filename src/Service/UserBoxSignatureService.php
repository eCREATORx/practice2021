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

    public function getSignature(int $boxId, $userId = 1): ?string
    {
        /** @var UserBoxSignatureRepository $userBoxSignatureRepository */
        $userBoxSignatureRepository = $this->entityManager->getRepository(UserBoxSignature::class);
        $signature = $userBoxSignatureRepository->getSignatureRecord($boxId, $userId);
        return $signature ? $signature->getSignature() : null;
    }

    public function saveSignature(int $boxId, string $signature, int $userId): void
    {
        $this->updateSignature($boxId, $signature);
/*        $signatureRecord = $this->getSignature($boxId, $userId);
        if ($signatureRecord)
        {
            $this->updateSignature($boxId, $signature);
        }
        else
        {
            $this->createSignature($userId, $boxId, $signature);
        }*/
    }

    private function updateSignature(int $boxId, string $signature): void
    {
        /** @var UserBoxSignatureRepository $userBoxSignatureRepository */
        $userBoxSignatureRepository = $this->entityManager->getRepository(UserBoxSignature::class);
        $userBoxSignatureRepository->updateSignature($boxId, $signature);
    }

    private function createSignature(int $userId, int $boxId, string $signature): void
    {
        /** @var UserBoxSignatureRepository $userBoxSignatureRepository */
        $userBoxSignatureRepository = $this->entityManager->getRepository(UserBoxSignature::class);
        $userBoxSignatureRepository->saveSignature($userId, $boxId, $signature);
    }
}