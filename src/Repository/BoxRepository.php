<?php

namespace App\Repository;

use App\Entity\Box;
use App\Entity\UserBoxSignature;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\ORM\Query\Expr\Join;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @method Box|null find($id, $lockMode = null, $lockVersion = null)
 * @method Box|null findOneBy(array $criteria, array $orderBy = null)
 * @method Box[]    findAll()
 * @method Box[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class BoxRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Box::class);
    }

    public function getUserBoxes(int $userId): array
    {
        return $this->createQueryBuilder('b')
            ->select('b.id, b.address')
            ->innerJoin(UserBoxSignature::class, 'ubs', Join::WITH, 'ubs.boxId = b.id')
            ->where('ubs.userId = :userId')
            ->setParameter(':userId', $userId)
            ->getQuery()
            ->getArrayResult();
    }
}
