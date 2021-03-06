<?php

namespace App\Repository;

use App\Entity\SignatureTemplate;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @method SignatureTemplate|null find($id, $lockMode = null, $lockVersion = null)
 * @method SignatureTemplate|null findOneBy(array $criteria, array $orderBy = null)
 * @method SignatureTemplate[]    findAll()
 * @method SignatureTemplate[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class SignatureTemplateRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, SignatureTemplate::class);
    }

    public function getTemplates(): array
    {
        return $this->createQueryBuilder('st')
            ->select('st.id, st.name, st.scheme, st.content')
            ->getQuery()
            ->getArrayResult();
    }
}
