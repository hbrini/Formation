const quizQuestions = [
  {
    theme: "Excel",
    questions: [
      {
        question: "Quelle est la formule pour sommer une plage sous condition ?",
        options: ["=SOMME()", "=SOMME.SI()", "=MOYENNE.SI()", "=SOMMEPROD()"],
        answer: 1
      },
      {
        question: "Quel outil sert à analyser rapidement de larges volumes de données dans Excel ?",
        options: ["Graphique", "Slicer", "Tableau croisé dynamique", "Mise en forme conditionnelle"],
        answer: 2
      },
      {
        question: "Comment appliquer un format automatiquement selon la valeur ?",
        options: ["Par validation de données", "Par filtre", "Par formatage conditionnel", "Par tris avancés"],
        answer: 2
      },
      {
        question: "Quelle extension pour un classeur Excel macro-activé ?",
        options: [".xls", ".xlsx", ".xlsm", ".xltx"],
        answer: 2
      },
      {
        question: "Quelle fonction permet de trouver la position d’un élément dans une plage ?",
        options: ["=POSITION()", "=RECHERCHE()", "=EQUIV()", "=INDEX()"],
        answer: 2
      }
      // Ajoute 3-5 questions supplémentaires si souhaité…
    ]
  },
  {
    theme: "PowerPoint",
    questions: [
      {
        question: "Où modifier le design général de toutes les diapositives ?",
        options: ["Onglet Conception", "Masque des diapositives", "Onglet Diaporama", "Transition"],
        answer: 1
      },
      {
        question: "Comment insérer une animation d’apparition sur un texte ?",
        options: ["Animations > Ajouter une animation", "Conception > Police", "Insertion > Zone de texte", "Fichier > Exporter"],
        answer: 0
      },
      {
        question: "Combien de types d’animations existent dans PowerPoint ?",
        options: ["1", "2", "3", "Plus de 3 (plusieurs catégories)"],
        answer: 3
      },
      {
        question: "Pour aligner des éléments précisément…",
        options: ["Clic droit > Disposer", "Utiliser les repères intelligents", "Tirer avec la souris", "Accueil > Copier"],
        answer: 1
      }
      // Ajoute 4-6 questions supplémentaires si souhaité…
    ]
  }
];
