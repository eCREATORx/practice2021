<?php

namespace App\Controller;

use App\Service\BoxService;
use App\Service\UserBoxSignatureService;
use App\Service\SignatureTemplateService;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;

class PageInfoController extends AbstractController
{
    private BoxService $boxService;
    private UserBoxSignatureService $userBoxSignatureService;
    private SignatureTemplateService $signatureTemplateService;

    public function __construct(BoxService $boxService, UserBoxSignatureService $userBoxSignatureService, SignatureTemplateService $signatureTemplateService)
    {
        $this->boxService = $boxService;
        $this->userBoxSignatureService = $userBoxSignatureService;
        $this->signatureTemplateService = $signatureTemplateService;
    }

    public function getUserBoxes(Request $request): JsonResponse
    {
        $userId = $request->get('user_id');
        return new JsonResponse($this->boxService->getUserBoxes($userId));
    }

    public function getSignature(Request $request): JsonResponse
    {
        $boxId = $request->get('box_id');
        return new JsonResponse($this->userBoxSignatureService->getSignature($boxId));
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