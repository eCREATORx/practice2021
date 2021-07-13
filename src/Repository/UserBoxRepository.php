<?php

namespace App\Repository;

use App\Entity\UserBox;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

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

    // /**
    //  * @return UserBox[] Returns an array of UserBox objects
    //  */
    /*
    public function findByExampleField($value)
    {
        return $this->createQueryBuilder('u')
            ->andWhere('u.exampleField = :val')
            ->setParameter('val', $value)
            ->orderBy('u.id', 'ASC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult()
        ;
    }
    */

    /*
    public function findOneBySomeField($value): ?UserBox
    {
        return $this->createQueryBuilder('u')
            ->andWhere('u.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */
}
