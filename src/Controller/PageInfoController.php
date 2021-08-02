<?php

namespace App\Controller;

use App\Service\UserBoxService;
use App\Service\SignatureTemplateService;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;

class PageInfoController extends AbstractController
{
    private UserBoxService $userBoxService;
    private SignatureTemplateService $signatureTemplateService;

    public function __construct(UserBoxService $userBoxService, SignatureTemplateService $signatureTemplateService)
    {
        $this->userBoxService = $userBoxService;
        $this->signatureTemplateService = $signatureTemplateService;
    }

    public function getUserBoxes(Request $request): JsonResponse
    {
        $userId = $request->get('user_id');
        return new JsonResponse($this->userBoxService->getUserBoxes($userId));
    }

    public function getTemplates(): JsonResponse
    {
        return new JsonResponse($this->signatureTemplateService->getTemplates());
    }
}