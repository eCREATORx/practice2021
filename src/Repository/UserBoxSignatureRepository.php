<?php

namespace App\Repository;

use App\Entity\UserBoxSignature;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\ORM\OptimisticLockException;
use Doctrine\ORM\ORMException;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @method UserBoxSignature|null find($id, $lockMode = null, $lockVersion = null)
 * @method UserBoxSignature|null findOneBy(array $criteria, array $orderBy = null)
 * @method UserBoxSignature[]    findAll()
 * @method UserBoxSignature[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class UserBoxSignatureRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, UserBoxSignature::class);
    }

    public function getSignatureRecord(int $userId, int $boxId): ?UserBoxSignature
    {
        $box = $this->findOneBy(['userId' => $userId, 'boxId' => $boxId]);
        return $box ?: null;
    }

    public function updateSignature(int $userId, int $boxId, string $signature): void
    {
        $this->createQueryBuilder('ubs')
            ->update()
            ->set('ubs.signature', ':signature')
            ->where('ubs.userId = :userId')
            ->andWhere('ubs.boxId = :boxId')
            ->setParameter('signature', $signature)
            ->setParameter('userId', $userId)
            ->setParameter('boxId', $boxId)
            ->getQuery()
            ->execute();
    }

    /**
     * @throws OptimisticLockException
     * @throws ORMException
     */
    public function createSignature(int $userId, int $boxId, string $signature): void
    {
        $entityManager = $this->getEntityManager();

        $record = new UserBoxSignature();

        $record->setUserId($userId);
        $record->setBoxId($boxId);
        $record->setSignature($signature);

        $entityManager->persist($record);
        $entityManager->flush();
    }
}
