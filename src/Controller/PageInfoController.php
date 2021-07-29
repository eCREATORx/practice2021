<?php

namespace App\Controller;

use App\Service\UserBoxService;
use App\Service\UserBoxSignatureService;
use App\Service\SignatureTemplateService;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;

class PageInfoController extends AbstractController
{
    private UserBoxService $userBoxService;
    private UserBoxSignatureService $userBoxSignatureService;
    private SignatureTemplateService $signatureTemplateService;

    public function __construct(UserBoxService $userBoxService, UserBoxSignatureService $userBoxSignatureService, SignatureTemplateService $signatureTemplateService)
    {
        $this->userBoxService = $userBoxService;
        $this->userBoxSignatureService = $userBoxSignatureService;
        $this->signatureTemplateService = $signatureTemplateService;
    }

    public function getUserBoxes(Request $request): JsonResponse
    {
        $userId = $request->get('user_id');
        return new JsonResponse($this->userBoxService->getUserBoxes($userId));
    }

    public function getSignature(Request $request): JsonResponse
    {
        $userId = $request->get('user_id');
        $boxId = $request->get('box_id');
        return new JsonResponse($this->userBoxSignatureService->getSignature($userId, $boxId));
    }

    public function getTemplates(): JsonResponse
    {
        return new JsonResponse($this->signatureTemplateService->getTemplates());
    }

    public function getTemplateStructure(Request $request): JsonResponse
    {
        $templateId = $request->get('template_id');
        return new JsonResponse($this->signatureTemplateService->getTemplateStructure($templateId));
    }

}