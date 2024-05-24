import { Routes } from "@angular/router";

export const content: Routes = [
  {
    path: "dashboard",
    loadChildren: () => import("../../utilisateur/utilisateur.module").then((m) => m.UtilisateurModule),
  },
  {
    path: "widgets",
    loadChildren: () => import("../../components/widgets/widgets.module").then((m) => m.WidgetsModule),
  },
  {
    path: "ui-kits",
    loadChildren: () => import("../../components/ui-kits/ui-kits.module").then((m) => m.UiKitsModule),
  },
  {
    path: "base",
    loadChildren: () => import("../../components/bonus-ui/base/base.module").then((m) => m.BaseModule),
  },
  {
    path: "advance",
    loadChildren: () => import("../../components/bonus-ui/advance/advance.module").then((m) => m.AdvanceModule),
  },
  {
    path: "project",
    loadChildren: () => import("../../components/apps/project/project.module").then((m) => m.ProjectModule),
  },
  {
    path: "ecommerce",
    loadChildren: () => import("../../components/apps/e-commerce/e-commerce.module").then((m) => m.ECommerceModule),
  },
  {
    path: "email",
    loadChildren: () => import("../../components/apps/email/email.module").then((m) => m.EmailModule),
  },

  {
    path: "user",
    loadChildren: () => import("../../components/apps/users/users.module").then((m) => m.UsersModule),
  },
  {
    path: "bookmarks",
    loadChildren: () => import("../../components/apps/bookmarks/bookmarks.module").then((m) => m.BookmarksModule),
  },
  {
    path: "file-manager",
    loadChildren: () => import("../../components/apps/file-manager/file-manager.module").then((m) => m.FileManagerModule),
  },
  {
    path: "contacts",
    loadChildren: () => import("../../components/apps/contacts/contacts.module").then((m) => m.ContactsModule),
  },
  {
    path: "tasks",
    loadChildren: () => import("../../components/apps/tasks/tasks.module").then((m) => m.TasksModule),
  },
  {
    path: "calender",
    loadChildren: () => import("../../components/apps/calender/calender.module").then((m) => m.CalenderModule),
  },
  {
    path: "social-app",
    loadChildren: () => import("../../components/apps/social-app/social-app.module").then((m) => m.SocialAppModule),
  },
  {
    path: "todo",
    loadChildren: () => import("../../components/apps/todo/todo.module").then((m) => m.TodoModule),
  },
  {
    path: "buttons",
    loadChildren: () => import("../../components/buttons/buttons.module").then((m) => m.ButtonsModule),
  },
  {
    path: "editor",
    loadChildren: () => import("../../components/editors/editor.module").then((m) => m.EditorModule),
  },
  {
    path: "chart",
    loadChildren: () => import("../../components/charts/charts.module").then((m) => m.ChartModule),
  },
  {
    path: "icons",
    loadChildren: () => import("../../components/icons/icons.module").then((m) => m.IconsModule),
  },
  {
    path: "form",
    loadChildren: () => import("../../components/forms/forms.module").then((m) => m.FormModule),
  },
  {
    path: "table",
    loadChildren: () => import("../../components/table/table.module").then((m) => m.TableModule),
  },
  {
    path: "cards",
    loadChildren: () => import("../../components/cards/cards.module").then((m) => m.CardsModule),
  },
  {
    path: "sample-page",
    loadChildren: () => import("../../components/others/sample/sample.module").then((m) => m.SampleModule),
  },
  {
    path: "Emplacement",
    loadChildren: () => import("../../emplacement/emplacement.module").then((m) => m.EmplacementModule),
  },
  {
    path: "Entreprise",
    loadChildren: () => import("../../entreprise/entreprise.module").then((m) => m.EntrepriseModule),
  },
  {
    path: "Domaine",
    loadChildren: () => import("../../domaine/domaine.module").then((m) => m.DomaineModule),
  },
  {
    path: "Utilisateur",
    loadChildren: () => import("../../utilisateur/utilisateur.module").then((m) => m.UtilisateurModule),
  },
  {
    path: "Module",
    loadChildren: () => import("../../module/module.module").then((m) => m.ModuleModule),
  },
  {
    path: "Profile",
    loadChildren: () => import("../../profile/profile.module").then((m) => m.ProfileModule),
  },
  {
    path: "Privilege",
    loadChildren: () => import("../../privilege/privilege.module").then((m) => m.PrivilegeModule),
  },
  {
    path: "Poste",
    loadChildren: () => import("../../poste/poste.module").then((m) => m.PosteModule),
  },
  {
    path: "Password",
    loadChildren: () => import("../../password-rest/password-rest.module").then((m) => m.PasswordRestModule),
  },
  {
    path: "Departement",
    loadChildren: () => import("../../departement/departement.module").then((m) => m.DepartementModule),
  },
  {
    path: "gallery",
    loadChildren: () => import("../../components/apps/gallery/gallery.module").then((m) => m.GalleryDemoModule),
  },
  {
    path: "blog",
    loadChildren: () => import("../../components/apps/blog/blog.module").then((m) => m.BlogModule),
  },
  {
    path: "faq",
    loadChildren: () => import("../../components/apps/faq/faq.module").then((m) => m.FaqModule),
  },
  {
    path: "job",
    loadChildren: () => import("../../components/apps/job-search/job-search.module").then((m) => m.JobSearchModule),
  },
  {
    path: "learning",
    loadChildren: () => import("../../components/apps/learning/learning.module").then((m) => m.LearningModule),
  },
  {
    path: "knowledgebase",
    loadChildren: () => import("../../components/apps/knowledge-base/knowledge-base.module").then((m) => m.KnowledgeBaseModule),
  },
  {
    path: "map",
    loadChildren: () => import("../../components/apps/map/map.module").then((m) => m.MapModule),
  },
  {
    path: "support-ticket",
    loadChildren: () => import("../../components/apps/support-ticket/support-ticket.module").then((m) => m.SupportTicketModule),
  },
  {
    path: "search-pages",
    loadChildren: () => import("../../components/others/search-result/search-result.module").then((m) => m.SearchResultModule),
  },
  {
    path: "Article",
    loadChildren: () => import("../../article/article.module").then((m) => m.ArticleModule),
  },
  {
    path: "CategorieArticle",
    loadChildren: () => import("../../categorie-article/categorie-article.module").then((m) => m.CategorieArticleModule),
  },
  {
    path: "TypeUsage",
    loadChildren: () => import("../../type-usager/type-usager.module").then((m) => m.TypeUsagerModule),
  },
  {
    path: "CategorieUsage",
    loadChildren: () => import("../../detail-type-usager/detail-type-usager.module").then((m) => m.DetailTypeUsagerModule),
  },
  {
    path: "Candidat",
    loadChildren: () => import("../../candidat/candidat.module").then((m) => m.CandidatModule),
  },
  {
    path: "Candidature",
    loadChildren: () => import("../../candidature/candidature.module").then((m) => m.CandidatureModule),
  },
  {
    path: "Calendrier",
    loadChildren: () => import("../../calendrier/calendrier.module").then((m) => m.CalendrierModule),
  },
  {
    path: "Offre",
    loadChildren: () => import("../../offre/offre.module").then((m) => m.OffreModule),
  },
  {
    path: "Entretien",
    loadChildren: () => import("../../entretien/entretien.module").then((m) => m.EntretienModule),
  },
  {
    path: "Evenement",
    loadChildren: () => import("../../evenement/evenement.module").then((m) => m.EvenementModule),
  },
  {
    path: "Recrutement",
    loadChildren: () => import("../../recrutement/recrutement.module").then((m) => m.RecrutementModule),
  },
  {
    path: "StatusCandidature",
    loadChildren: () => import("../../Status-Candidature/Status-Candidature.module").then((m) => m.StatusCandidatureModule),
  },
  

  
];
