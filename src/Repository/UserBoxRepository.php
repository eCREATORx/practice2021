<?php

namespace App\Repository;

use App\Entity\Box;
use App\Entity\UserBox;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;
use Doctrine\ORM\Query\Expr\Join;

/**
 * @method UserBox|null find($id, $lockMode = null, $lockVersion = null)
 * @method UserBox|null findOneBy(array $criteria, array $orderBy = null)
 * @method UserBox[]    findAll()
 * @method UserBox[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class UserBoxRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, UserBox::class);
    }

    public function getUserBoxes(int $userId): array
    {
        return $this->createQueryBuilder('ub')
            ->select('b.id, b.address')
            ->innerJoin(Box::class, 'b', Join::WITH, 'ub.boxId = b.id')
            ->where('ub.userId = :userId')
            ->setParameter(':userId', $userId)
            ->getQuery()
            ->getArrayResult();
    }
}