<?php

namespace App\Controller;

use App\Service\BoxService;
use App\Service\UserBoxService;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;

class PageInfoController extends AbstractController
{
    private BoxService $boxService;
    private UserBoxService $userBoxService;

    public function __construct(BoxService $boxService, UserBoxService $userBoxService)
    {
        $this->boxService = $boxService;
        $this->userBoxService = $userBoxService;
    }

    public function getUserBoxes(Request $request): JsonResponse
    {
        $userId = $request->get('user_id');
        return new JsonResponse($this->boxService->getUserBoxes($userId));
    }

    public function getSignature(Request $request): JsonResponse
    {
        $boxId = $request->get('box_id');
        return new JsonResponse($this->userBoxService->getSignature($boxId));
    }
}