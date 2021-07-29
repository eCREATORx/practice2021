<?php

namespace App\Service;

use App\Entity\UserBoxSignature;
use App\Repository\UserBoxSignatureRepository;
use Doctrine\ORM\OptimisticLockException;
use Doctrine\ORM\ORMException;
use Doctrine\Persistence\ManagerRegistry;
use Doctrine\Persistence\ObjectManager;

class UserBoxSignatureService
{
    private ObjectManager $entityManager;

    public function __construct(ManagerRegistry $registry)
    {
        $this->entityManager = $registry->getManager('default');
    }

    public function getSignature(int $userId, int $boxId): ?string
    {
        /** @var UserBoxSignatureRepository $userBoxSignatureRepository */
        $userBoxSignatureRepository = $this->entityManager->getRepository(UserBoxSignature::class);
        $signature = $userBoxSignatureRepository->getSignatureRecord($userId, $boxId);
        return $signature ? $signature->getSignature() : null;
    }

    /**
     * @throws OptimisticLockException
     * @throws ORMException
     */
    public function saveSignature(int $userId, int $boxId, string $signature): void
    {
        $signatureRecord = $this->getSignature($userId, $boxId);
        if ($signatureRecord)
        {
            $this->updateSignature($userId, $boxId, $signature);
        }
        else
        {
            $this->createSignature($userId, $boxId, $signature);
        }
    }

    private function updateSignature(int $userId, int $boxId, string $signature): void
    {
        /** @var UserBoxSignatureRepository $userBoxSignatureRepository */
        $userBoxSignatureRepository = $this->entityManager->getRepository(UserBoxSignature::class);
        $userBoxSignatureRepository->updateSignature($userId, $boxId, $signature);
    }

    /**
     * @throws OptimisticLockException
     * @throws ORMException
     */
    private function createSignature(int $userId, int $boxId, string $signature): void
    {
        /** @var UserBoxSignatureRepository $userBoxSignatureRepository */
        $userBoxSignatureRepository = $this->entityManager->getRepository(UserBoxSignature::class);
        $userBoxSignatureRepository->createSignature($userId, $boxId, $signature);
    }
}