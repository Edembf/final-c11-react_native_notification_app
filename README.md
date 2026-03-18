# coding-project-template
Bienvenue dans le projet final du cours sur les Notifications d'Applications Mobiles, Bases de Données et Publication. Vous assumerez le rôle d'un développeur React Native chargé de créer une application de publication entièrement fonctionnelle et privée ou partageable nommée PostifyMe. C'est comme un journal numérique qui permettra aux utilisateurs de télécharger une note et d'ajouter éventuellement une image et de la rendre privée ou publique. Votre objectif est de concevoir et de développer une expérience utilisateur fluide où les utilisateurs peuvent ajouter et gérer leurs publications ainsi que consulter celles des autres.

Créez un nouveau projet et configurez le back-end pour votre projet. Vous aurez besoin des services Firebase suivants :

Authentification : À utiliser pour l'inscription et la connexion
Base de données et index : Table pour stocker l'URL de l'avatar pour chaque utilisateur ainsi que leur nom d'affichage basé sur leur email
Les détails inclus ici suggèrent une structure pour la table user_data. Vous pouvez utiliser la même structure ou ajouter votre propre contenu.

Détails de l'utilisateur

avatar : URL de l'image sous forme de chaîne
displayName : Nom sous forme de chaîne
email : Email de l'utilisateur sous forme de chaîne
Les détails inclus ici suggèrent une structure pour la table postify_posts. Vous pouvez choisir votre propre contenu.
title : Sous forme de chaîne
text : Sous forme de chaîne multi-lignes
imageUrl : URL de l'image publiée
createAt : Date et heure de création du post
private : Booléen indiquant si le post est privé
En plus de cela, vous devez créer des index selon les besoins.
