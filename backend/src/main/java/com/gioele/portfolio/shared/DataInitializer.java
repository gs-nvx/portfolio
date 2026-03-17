package com.gioele.portfolio.shared;

import com.gioele.portfolio.auth.AdminUser;
import com.gioele.portfolio.auth.AdminUserRepository;
import com.gioele.portfolio.cms.CmsSection;
import com.gioele.portfolio.cms.CmsSectionRepository;
import com.gioele.portfolio.configurator.ConfiguratorPackage;
import com.gioele.portfolio.configurator.ConfiguratorPackageRepository;
import com.gioele.portfolio.configurator.ConfiguratorService;
import com.gioele.portfolio.configurator.ConfiguratorServiceRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Component
@RequiredArgsConstructor
public class DataInitializer implements CommandLineRunner {

    private final AdminUserRepository adminUserRepository;
    private final CmsSectionRepository cmsSectionRepository;
    private final ConfiguratorPackageRepository configuratorPackageRepository;
    private final ConfiguratorServiceRepository configuratorServiceRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) {
        if (adminUserRepository.count() == 0) {
            AdminUser admin = AdminUser.builder()
                    .username("gioele")
                    .passwordHash(passwordEncoder.encode("gioele"))
                    .createdAt(LocalDateTime.now())
                    .build();
            adminUserRepository.save(admin);
            System.out.println("Utente admin creato — cambia la password!");
        }

        if (cmsSectionRepository.count() == 0) {
            List<CmsSection> sections = List.of(
                    CmsSection.builder()
                            .sectionKey("hero")
                            .enabled(true)
                            .sortOrder(1)
                            .locale("it")
                            .updatedAt(LocalDateTime.now())
                            .contentJson("""
                {
                  "titolo": "Sviluppo web per PMI",
                  "sottotitolo": "Siti e gestionali su misura per la tua azienda",
                  "testo_cta": "Scopri i servizi",
                  "link_cta": "/servizi",
                  "immagine": ""
                }
                """)
                            .build(),
                    CmsSection.builder()
                            .sectionKey("servizi")
                            .enabled(true)
                            .sortOrder(2)
                            .locale("it")
                            .updatedAt(LocalDateTime.now())
                            .contentJson("""
        {
          "titolo_sezione": "Pacchetti e prezzi",
          "sottotitolo_sezione": "Soluzioni su misura per la tua attività"
        }
        """)
                            .build(),
                    CmsSection.builder()
                            .sectionKey("portfolio")
                            .enabled(true)
                            .sortOrder(3)
                            .locale("it")
                            .updatedAt(LocalDateTime.now())
                            .contentJson("""
                {
                  "titolo_sezione": "Portfolio",
                  "casi_studio": []
                }
                """)
                            .build(),
                    CmsSection.builder()
                            .sectionKey("chi_sono")
                            .enabled(true)
                            .sortOrder(4)
                            .locale("it")
                            .updatedAt(LocalDateTime.now())
                            .contentJson("""
                {
                  "titolo": "Chi sono",
                  "testo": "Inserisci qui la tua descrizione.",
                  "immagine": "",
                  "anni_esperienza": 3,
                  "tecnologie": ["Java", "Spring Boot", "React"]
                }
                """)
                            .build(),
                    CmsSection.builder()
                            .sectionKey("testimonianze")
                            .enabled(true)
                            .sortOrder(5)
                            .locale("it")
                            .updatedAt(LocalDateTime.now())
                            .contentJson("""
                {
                  "titolo_sezione": "Cosa dicono i clienti",
                  "testimonianze": []
                }
                """)
                            .build()
            );
            cmsSectionRepository.saveAll(sections);
        }

        if (configuratorPackageRepository.count() == 0) {
            seedConfigurator();
        }

    }
    private void seedConfigurator() {

        // ── Add-on / servizi extra ──
        ConfiguratorService blog = configuratorServiceRepository.save(
                svc("Add-on", "Blog integrato", "Sezione notizie e articoli",
                        "Pubblica notizie, aggiornamenti e articoli sul tuo sito",
                        "Sezione notizie e articoli con editor",
                        150, 10, null, null, null, null, 1));

        ConfiguratorService multilang = configuratorServiceRepository.save(
                svc("Add-on", "Multilingua EN", "Sito anche in inglese",
                        "Versione inglese del sito per clienti internazionali",
                        "i18n EN",
                        200, 10, "hospitality,professional,ecommerce", null, null, null, 2));

        ConfiguratorService seoBase = configuratorServiceRepository.save(
                svc("Add-on", "SEO base", "Fatti trovare su Google",
                        "Configurazione base per apparire sui motori di ricerca",
                        "SEO base + Google Search Console",
                        120, 0, null, "seo", null, null, 3));

        ConfiguratorService seoAdv = configuratorServiceRepository.save(
                svc("Add-on", "SEO avanzato", "Posizionamento avanzato su Google",
                        "Ottimizzazione contenuti e report mensile di posizionamento",
                        "SEO avanzato + report mensile",
                        250, 29, null, "seo", null, null, 4));

        ConfiguratorService booking = configuratorServiceRepository.save(
                svc("Add-on", "Prenotazioni online", "Prenotazioni online",
                        "Sistema di prenotazione integrato nel sito",
                        "Sistema booking integrato",
                        350, 19, "hospitality,fitness,food", null, null, null, 5));

        ConfiguratorService shop = configuratorServiceRepository.save(
                svc("Add-on", "Vendita online", "Vendita online",
                        "Vendi i tuoi prodotti direttamente dal sito con pagamenti Stripe",
                        "E-commerce Stripe",
                        500, 29, "retail,food", null, null, null, 6));

        ConfiguratorService members = configuratorServiceRepository.save(
                svc("Add-on", "Area clienti", "Area riservata per i tuoi clienti",
                        "I tuoi clienti accedono a documenti e informazioni riservate",
                        "Login clienti + documenti",
                        350, 20, "professional,fitness", null, null, null, 7));

        ConfiguratorService gdpr = configuratorServiceRepository.save(
                svc("Add-on", "GDPR e Privacy", "Cookie e privacy GDPR",
                        "Banner cookie e privacy policy conforme al GDPR",
                        "Banner cookie + privacy policy",
                        80, 0, null, null, null, null, 8));

        ConfiguratorService training = configuratorServiceRepository.save(
                svc("Add-on", "Formazione", "Formazione uso pannello",
                        "2 ore di formazione per gestire il sito in autonomia",
                        "2h formazione CMS",
                        90, 0, null, null, null, null, 9));

        ConfiguratorService migration = configuratorServiceRepository.save(
                svc("Add-on", "Migrazione sito", "Ho già un sito da aggiornare",
                        "Migrazione dei contenuti dal tuo sito attuale",
                        "Migrazione contenuti",
                        300, 0, null, null, null, null, 10));

        // ── Servizi base inclusi nei pacchetti ──
        ConfiguratorService sitoCms = configuratorServiceRepository.save(
                svc("Base", "Sito con pannello di gestione", "Sito gestibile",
                        "Aggiorna testi e immagini in autonomia",
                        "Sito vetrina con CMS",
                        0, 0, null, null, null, null, 1));

        ConfiguratorService hostingDominio = configuratorServiceRepository.save(
                svc("Base", "Hosting e dominio", "Hosting e dominio incluso",
                        "Server, dominio e certificato SSL inclusi",
                        "Hosting + dominio + SSL",
                        0, 0, null, null, null, null, 2));

        ConfiguratorService backupStats = configuratorServiceRepository.save(
                svc("Base", "Backup e statistiche", "Backup e statistiche inclusi",
                        "Backup automatico e dashboard visite",
                        "Backup + statistiche accesso",
                        0, 0, null, null, null, null, 3));

        ConfiguratorService assistenza = configuratorServiceRepository.save(
                svc("Base", "Assistenza", "Assistenza inclusa",
                        "Supporto tecnico via email",
                        "Assistenza email",
                        0, 0, null, null, null, null, 4));

        ConfiguratorService gestionale = configuratorServiceRepository.save(
                svc("Base", "Gestionale attività", "Gestionale su misura",
                        "Pannello gestionale personalizzato per la tua attività",
                        "Gestionale custom",
                        0, 0, null, null, null, null, 5));

        ConfiguratorService areaClienti = configuratorServiceRepository.save(
                svc("Base", "Area clienti inclusa", "Area clienti inclusa",
                        "I tuoi clienti accedono a una sezione riservata",
                        "Login clienti",
                        0, 0, null, null, null, null, 6));

        ConfiguratorService emailAziendale = configuratorServiceRepository.save(
                svc("Base", "Email aziendale", "Email aziendale inclusa",
                        "Casella email con il tuo dominio",
                        "Email aziendale",
                        0, 0, null, null, null, null, 7));

        ConfiguratorService ecommerceBase = configuratorServiceRepository.save(
                svc("Base", "Negozio online", "E-commerce incluso",
                        "Catalogo prodotti, carrello e pagamenti Stripe",
                        "E-commerce completo",
                        0, 0, null, null, null, null, 8));

        ConfiguratorService fatturazioneBase = configuratorServiceRepository.save(
                svc("Base", "Fatturazione", "Fatturazione inclusa",
                        "Generazione preventivi e fatture in PDF",
                        "Fatturazione PDF",
                        0, 0, null, null, null, null, 9));

        // ── Pacchetti (tipi di attività) ──
        Set<ConfiguratorService> starterBase = new HashSet<>(
                Set.of(sitoCms, hostingDominio, backupStats, assistenza));

        Set<ConfiguratorService> businessBase = new HashSet<>(
                Set.of(sitoCms, hostingDominio, backupStats, assistenza,
                        gestionale, areaClienti, emailAziendale));

        configuratorPackageRepository.saveAll(List.of(

                ConfiguratorPackage.builder()
                        .name("Negozio / attività commerciale")
                        .description("Sito vetrina per il tuo negozio, con schede prodotto e informazioni")
                        .activityType("retail")
                        .setupAmount(0).monthlyAmount(79)
                        .sortOrder(1).enabled(true).offerEnabled(false)
                        .includedServices(starterBase)
                        .build(),

                ConfiguratorPackage.builder()
                        .name("B&B / affittacamere / agriturismo")
                        .description("Sito per strutture ricettive con galleria, disponibilità e prenotazioni")
                        .activityType("hospitality")
                        .setupAmount(800).monthlyAmount(129)
                        .sortOrder(2).enabled(true).offerEnabled(false)
                        .includedServices(businessBase)
                        .build(),

                ConfiguratorPackage.builder()
                        .name("Palestra / studio sportivo")
                        .description("Gestionale per corsi, abbonamenti e prenotazioni lezioni")
                        .activityType("fitness")
                        .setupAmount(800).monthlyAmount(129)
                        .sortOrder(3).enabled(true).offerEnabled(false)
                        .includedServices(businessBase)
                        .build(),

                ConfiguratorPackage.builder()
                        .name("Ristorante / bar / pizzeria")
                        .description("Sito con menu digitale, orari e prenotazioni tavoli")
                        .activityType("food")
                        .setupAmount(0).monthlyAmount(79)
                        .sortOrder(4).enabled(true).offerEnabled(false)
                        .includedServices(starterBase)
                        .build(),

                ConfiguratorPackage.builder()
                        .name("Studio professionale")
                        .description("Sito per professionisti con area clienti e documenti riservati")
                        .activityType("professional")
                        .setupAmount(0).monthlyAmount(79)
                        .sortOrder(5).enabled(true).offerEnabled(false)
                        .includedServices(starterBase)
                        .build(),

                ConfiguratorPackage.builder()
                        .name("Voglio vendere online")
                        .description("E-commerce completo con catalogo, carrello e pagamenti Stripe")
                        .activityType("ecommerce")
                        .setupAmount(1500).monthlyAmount(199)
                        .sortOrder(6).enabled(true)
                        .offerEnabled(true)
                        .offerLabel("Offerta lancio")
                        .offerDiscountSetup(500)
                        .offerDiscountMonthly(0)
                        .includedServices(new HashSet<>(Set.of(
                                sitoCms, hostingDominio, backupStats, assistenza,
                                ecommerceBase, emailAziendale)))
                        .build(),

                ConfiguratorPackage.builder()
                        .name("Altro")
                        .description("Non hai trovato il tuo settore? Partiamo da una base personalizzabile")
                        .activityType("other")
                        .setupAmount(0).monthlyAmount(79)
                        .sortOrder(7).enabled(true).offerEnabled(false)
                        .includedServices(starterBase)
                        .build()
        ));
    }

    // metodo helper svc aggiornato con nuovi parametri
    private ConfiguratorService svc(
            String category, String name, String clientLabel,
            String clientDescription, String description,
            int setup, int monthly,
            String visibleFor, String exclusiveGroup,
            ConfiguratorPackage requiresPkg,
            ConfiguratorService requiresSvc,
            int sortOrder) {
        return ConfiguratorService.builder()
                .category(category).name(name)
                .clientLabel(clientLabel)
                .clientDescription(clientDescription)
                .description(description)
                .setupAmount(setup).monthlyAmount(monthly)
                .visibleFor(visibleFor).exclusiveGroup(exclusiveGroup)
                .requiresPackage(requiresPkg).requiresService(requiresSvc)
                .sortOrder(sortOrder).enabled(true).build();
    }
}
