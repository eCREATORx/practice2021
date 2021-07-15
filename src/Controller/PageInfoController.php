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
    private SignatureTemplateService $templateService;

    public function __construct(BoxService $boxService, UserBoxSignatureService $userBoxSignatureService, SignatureTemplateService $templateService)
    {
        $this->boxService = $boxService;
        $this->userBoxSignatureService = $userBoxSignatureService;
        $this->templateService = $templateService;
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

    public function setSignature(Request $request)
    {
        $boxId = $request->get('box_id');
        $signature = "";
        $this->userBoxSignatureService->setSignature($boxId, $signature);
    }

    public function getTemplates(): JsonResponse
    {
        return new JsonResponse($this->templateService->getTemplates());
    }
}