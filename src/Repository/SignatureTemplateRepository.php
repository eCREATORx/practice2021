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
        return $this->createQueryBuilder('t')
            ->select('t.id, t.name, t.scheme')
            ->getQuery()
            ->getArrayResult();
    }

    public function getTemplateStructure(int $templateId): array
    {
        return $this->createQueryBuilder('st')
            ->select('st.scheme, st.content')
            ->where('st.id = :id')
            ->setParameter('id', $templateId)
            ->getQuery()
            ->getArrayResult();
    }
}
