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

    public function getSignature(int $boxId): string
    {
        $box = $this->findOneBy(['boxId' => $boxId]);
        return $box->getSignature();
    }
}
