<?php

namespace App\Repository;

use App\Entity\UserBoxSignature;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
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

    public function getSignature(int $boxId): string
    {
        $box = $this->findOneBy(['boxId' => $boxId]);
        return $box->getSignature();
    }

    public function setSignature(int $boxId, string $signature)
    {
        $box = $this->findOneBy(['boxId' => $boxId]);
        $box->setSignature($signature);
    }
}
