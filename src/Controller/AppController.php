<?php
namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;

class AppController extends AbstractController
{
    public function renderApp(): Response
    {
        return $this->render('App.html.twig');
    }
}