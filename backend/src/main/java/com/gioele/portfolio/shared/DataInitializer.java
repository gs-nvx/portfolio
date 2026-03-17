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

        // ── Servizi base ──
        ConfiguratorService vetrinaBase = svc("Base", "Sito vetrina configurabile",
                "Pagine gestibili da pannello CMS", 0, 0, null, null, 1);
        ConfiguratorService hostingBase = svc("Base", "Hosting e dominio incluso",
                "Server dedicato con dominio personalizzato", 0, 0, null, null, 2);
        ConfiguratorService sslBase = svc("Base", "SSL e sicurezza",
                "Certificato SSL e protezione base", 0, 0, null, null, 3);
        ConfiguratorService cmsBase = svc("Base", "Pannello di gestione contenuti",
                "Editor visuale per testi e immagini", 0, 0, null, null, 4);
        ConfiguratorService emailBase = svc("Base", "Email aziendale",
                "Casella email con dominio personalizzato", 0, 0, null, null, 5);
        ConfiguratorService backupBase = svc("Base", "Backup automatico",
                "Backup giornaliero con retention 30gg", 0, 0, null, null, 6);
        ConfiguratorService statsBase = svc("Base", "Statistiche di accesso",
                "Dashboard visite e comportamento utenti", 0, 0, null, null, 7);
        ConfiguratorService telefonoBase = svc("Base", "Assistenza telefonica",
                "Supporto telefonico in orario lavorativo", 0, 0, null, null, 8);
        ConfiguratorService catalogoBase = svc("Base", "Catalogo prodotti",
                "Prodotti, categorie e filtri di ricerca", 0, 0, null, null, 9);
        ConfiguratorService carrelloBase = svc("Base", "Carrello e checkout",
                "Pagamenti online con Stripe", 0, 0, null, null, 10);
        ConfiguratorService ordiniBase = svc("Base", "Gestione ordini",
                "Dashboard ordini e stato spedizioni", 0, 0, null, null, 11);
        ConfiguratorService crmBase2 = svc("Base", "CRM clienti",
                "Anagrafica clienti e storico interazioni", 0, 0, null, null, 12);
        ConfiguratorService fattBase = svc("Base", "Fatturazione",
                "Preventivi e fatture PDF", 0, 0, null, null, 13);
        ConfiguratorService kpiBase = svc("Base", "Dashboard KPI",
                "Grafici e metriche di business", 0, 0, null, null, 14);

        configuratorServiceRepository.saveAll(List.of(
                vetrinaBase, hostingBase, sslBase, cmsBase, emailBase,
                backupBase, statsBase, telefonoBase, catalogoBase, carrelloBase,
                ordiniBase, crmBase2, fattBase, kpiBase
        ));

        // ── Servizi extra ──

        // Sito pubblico
        ConfiguratorService pagineExtra = svc("Sito pubblico", "Pagine aggiuntive (oltre 5)",
                "Fino a 10 pagine totali", 100, 0, null, null, 1);
        ConfiguratorService blog = svc("Sito pubblico", "Blog integrato",
                "Sezione articoli con editor", 150, 10, null, null, 2);
        ConfiguratorService multilingua = svc("Sito pubblico", "Multilingua (EN)",
                "Versione inglese del sito", 200, 10, null, null, 3);
        ConfiguratorService formAvanzato = svc("Sito pubblico", "Form contatti avanzato",
                "Allegati e campi personalizzati", 100, 0, null, null, 4);
        configuratorServiceRepository.saveAll(List.of(pagineExtra, blog, multilingua, formAvanzato));

        // SEO
        ConfiguratorService seoBase = configuratorServiceRepository.save(
                svc("SEO e ottimizzazione", "SEO base",
                        "Meta tag, sitemap, Google Search Console", 150, 0, null, null, 1));
        ConfiguratorService seoAdv = svc("SEO e ottimizzazione", "SEO avanzato",
                "Ottimizzazione contenuti e report mensile", 300, 29, null, seoBase, 2);
        ConfiguratorService analytics = svc("SEO e ottimizzazione", "Google Analytics",
                "Installazione e configurazione", 80, 0, null, null, 3);
        configuratorServiceRepository.saveAll(List.of(seoAdv, analytics));

        // Area riservata — salvo il pacchetto business dopo, uso placeholder
        // lo aggiungo dopo la creazione dei pacchetti

        // Integrazioni
        ConfiguratorService emailMkt = svc("Integrazioni", "Email marketing",
                "Integrazione Mailchimp / Brevo", 200, 10, null, null, 1);
        configuratorServiceRepository.save(emailMkt);

        // Manutenzione
        ConfiguratorService uptime = svc("Manutenzione e supporto", "Monitoraggio uptime",
                "Alert immediato in caso di downtime", 0, 9, null, null, 1);
        ConfiguratorService aggiornamenti = svc("Manutenzione e supporto", "Aggiornamenti CMS",
                "Aggiornamenti mensili contenuti inclusi", 0, 19, null, null, 2);
        configuratorServiceRepository.saveAll(List.of(uptime, aggiornamenti));

        // ── Pacchetti ──

        ConfiguratorPackage vetrina = configuratorPackageRepository.save(
                ConfiguratorPackage.builder()
                        .name("Vetrina configurabile")
                        .description("Sito web professionale con pagine e contenuti gestibili autonomamente")
                        .setupAmount(300).monthlyAmount(49).sortOrder(1).enabled(true)
                        .offerEnabled(true)
                        .offerLabel("Offerta lancio")
                        .offerDiscountSetup(100)
                        .offerDiscountMonthly(0)
                        .includedServices(new HashSet<>(Set.of(
                                vetrinaBase, hostingBase, sslBase, cmsBase,
                                backupBase, statsBase)))
                        .build());

        ConfiguratorPackage ecommerce = configuratorPackageRepository.save(
                ConfiguratorPackage.builder()
                        .name("E-commerce")
                        .description("Negozio online completo con gestione prodotti, ordini e pagamenti")
                        .setupAmount(900).monthlyAmount(99).sortOrder(2).enabled(true)
                        .offerEnabled(false)
                        .includedServices(new HashSet<>(Set.of(
                                vetrinaBase, hostingBase, sslBase, cmsBase,
                                emailBase, backupBase, statsBase,
                                catalogoBase, carrelloBase, ordiniBase)))
                        .build());

        ConfiguratorPackage gestionale = configuratorPackageRepository.save(
                ConfiguratorPackage.builder()
                        .name("Gestionale completo")
                        .description("Soluzione gestionale su misura con CRM, fatturazione e dashboard")
                        .setupAmount(1500).monthlyAmount(149).sortOrder(3).enabled(true)
                        .offerEnabled(false)
                        .includedServices(new HashSet<>(Set.of(
                                vetrinaBase, hostingBase, sslBase, cmsBase,
                                emailBase, backupBase, statsBase, telefonoBase,
                                crmBase2, fattBase, kpiBase)))
                        .build());

        // Servizi extra con dipendenza da pacchetto — ora che i pacchetti esistono
        ConfiguratorService loginClienti = configuratorServiceRepository.save(
                svc("Area riservata", "Login clienti",
                        "Area riservata con accesso clienti", 400, 20, ecommerce, null, 1));
        configuratorServiceRepository.save(
                svc("Area riservata", "Documenti clienti",
                        "Upload e download documenti", 200, 10, null, loginClienti, 2));

        ConfiguratorService apiCustom = configuratorServiceRepository.save(
                svc("Integrazioni", "API esterna custom",
                        "Connessione a servizi terzi", 400, 19, gestionale, null, 2));
        configuratorServiceRepository.save(
                svc("Integrazioni", "Webhook e automazioni",
                        "Trigger automatici tra servizi", 300, 19, null, apiCustom, 3));

        ConfiguratorService supportoPrio = configuratorServiceRepository.save(
                svc("Manutenzione e supporto", "Supporto prioritario",
                        "Risposta entro 4h in orario lavorativo", 0, 29, ecommerce, null, 3));
    }

    private ConfiguratorService svc(
            String category, String name, String description,
            int setup, int monthly,
            ConfiguratorPackage requiresPkg,
            ConfiguratorService requiresSvc,
            int sortOrder) {
        return ConfiguratorService.builder()
                .category(category).name(name).description(description)
                .setupAmount(setup).monthlyAmount(monthly)
                .requiresPackage(requiresPkg).requiresService(requiresSvc)
                .sortOrder(sortOrder).enabled(true).build();
    }
}
