<?php
namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

class AppController extends AbstractController
{

    public function renderApp()
    {
        return $this->render('App.html.twig');
    }
}