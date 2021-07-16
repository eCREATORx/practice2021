<?php

namespace App\Service;

use App\Entity\SignatureTemplate;
use App\Repository\SignatureTemplateRepository;
use Doctrine\Persistence\ManagerRegistry;
use Doctrine\Persistence\ObjectManager;

class SignatureTemplateService
{
    private ObjectManager $entityManager;

    public function __construct(ManagerRegistry $registry)
    {
        $this->entityManager = $registry->getManager('default');
    }

    public function getTemplates(): array
    {
        /** @var SignatureTemplateRepository $signatureTemplateRepository */
        $signatureTemplateRepository = $this->entityManager->getRepository(SignatureTemplate::class);
        return $signatureTemplateRepository->getTemplates();
    }

    public function getTemplateStructure(int $templateId): array
    {
        /** @var SignatureTemplateRepository $signatureTemplateRepository */
        $signatureTemplateRepository = $this->entityManager->getRepository(SignatureTemplate::class);
        return $signatureTemplateRepository->getTemplateStructure($templateId);
    }
}