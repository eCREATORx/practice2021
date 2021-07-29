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
        /** @var UserBoxSignatureRepository $userBoxSignatureRepository */
        $userBoxSignatureRepository = $this->entityManager->getRepository(UserBoxSignature::class);
        $signatureRecord = $this->getSignature($userId, $boxId);
        if ($signatureRecord)
        {
            $userBoxSignatureRepository->updateSignature($userId, $boxId, $signature);
        }
        else
        {
            $userBoxSignatureRepository->createSignature($userId, $boxId, $signature);
        }
    }
}