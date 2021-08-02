<?php

namespace App\Controller;

use App\Service\SignatureTemplateService;
use App\Service\UserBoxSignatureService;
use Doctrine\ORM\OptimisticLockException;
use Doctrine\ORM\ORMException;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;

class SignatureController extends AbstractController
{
    private UserBoxSignatureService $userBoxSignatureService;
    private SignatureTemplateService $signatureTemplateService;

    public function __construct(UserBoxSignatureService $userBoxSignatureService, SignatureTemplateService $signatureTemplateService)
    {
        $this->userBoxSignatureService = $userBoxSignatureService;
        $this->signatureTemplateService = $signatureTemplateService;
    }

    public function getSignature(Request $request): JsonResponse
    {
        $userId = $request->get('user_id');
        $boxId = $request->get('box_id');
        return new JsonResponse($this->userBoxSignatureService->getSignature($userId, $boxId));
    }

    public function getTemplateStructure(Request $request): JsonResponse
    {
        $templateId = $request->get('template_id');
        return new JsonResponse($this->signatureTemplateService->getTemplateStructure($templateId));
    }

    /**
     * @throws OptimisticLockException
     * @throws ORMException
     */
    public function saveSignature(Request $request): JsonResponse
    {
        $userId = $request->get('user_id');
        $boxId = $request->get('box_id');
        $signature = $request->getContent();

        $this->userBoxSignatureService->saveSignature($userId, $boxId, $signature);
        return new JsonResponse(true);
    }
}