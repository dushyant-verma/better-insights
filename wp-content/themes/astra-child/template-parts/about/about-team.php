<?php
/**
 * Better Insights - About Page Section 6: Our Team Directory Grid & Profile Modal
 * Source of truth: https://www.betterinsights.in/about/team/
 * Individual profile pages: https://www.betterinsights.in/teams/{profile-slug}/
 *
 * @package Astra_Child
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

$theme_uri = get_stylesheet_directory_uri();

/**
 * Team Members Configuration.
 * Fully verified from individual profile pages on https://www.betterinsights.in/teams/
 * Filterable via 'bi_team_members' for CMS / WordPress extensibility.
 */
$default_team = array(
	array(
		'id'                 => 'gautam-koli',
		'name'               => 'Gautam Koli',
		'role'               => 'Founder & Director',
		'department'         => 'Executive Leadership',
		'image'              => $theme_uri . '/assets/images/team/gautam-koli.png',
		'original_photo'     => $theme_uri . '/assets/images/team/photos/gautam-koli-photo.jpg',
		'original_photo_url' => 'https://www.betterinsights.in/wp-content/uploads/2022/08/Gautam-Koli.jpg',
		'linkedin'           => 'https://www.linkedin.com/company/better-insights-bi/',
		'bio'                => "As a seasoned professional with 7 years of experience, I bring a unique perspective to my work as a creative thinker. I am driven by my surroundings and inspired by life, allowing me to approach each project with an original and innovative mindset.\n\nI am highly dedicated to my work, consistently striving for excellence through critical thinking and a “get-it-done” attitude. My progress and success are a result of overcoming obstacles and making my work a priority.\n\nClient satisfaction is of utmost importance to me and I firmly believe that the quality of my work is worth the investment. I take a proactive approach to client relations, anticipating any potential challenges and providing long-term solutions that are tailored to their specific needs. I am committed to maintaining the trust of my clients, and I never make false promises.\n\nMy team is my greatest asset and I am proud to lead a group of highly skilled professionals who bring a unique touch to each project. By fostering an environment of trust and collaboration, we are able to achieve greater insights and make rapid progress as a unit.",
		'expertise'          => array( 'Research', 'AI Automation' ),
		'experience'         => '7+ years leading creative strategy, digital innovation, critical thinking and agency leadership.',
	),
	array(
		'id'                 => 'dinkey-lekhwani',
		'name'               => 'Dinkey Lekhwani',
		'role'               => 'Business Development Manager',
		'department'         => 'Growth & Partnerships',
		'image'              => $theme_uri . '/assets/images/team/dinkey-lekhwani.png',
		'original_photo'     => $theme_uri . '/assets/images/team/photos/dinkey-lekhwani-photo.png',
		'original_photo_url' => 'https://www.betterinsights.in/wp-content/uploads/2025/06/dinkey-mam.png',
		'linkedin'           => 'https://www.linkedin.com/company/better-insights-bi/',
		'bio'                => "Hi, I'm Dinkey Lekhwani, Business Development Manager at Better Insights. As the Business Development Manager at Better Insights, I drive 360° growth strategies by seamlessly aligning client goals with digital execution. From leading client onboarding and managing full-cycle campaigns to streamlining backend operations, I work at the core of what makes our digital agency thrive.\n\nWith hands-on expertise in Shopify, Zoho CRM automation, Meta and Google Ads, and cross-platform integrations , I ensure every project delivers results that are not only creative but conversion-focused. My role bridges the gap between client expectations and team execution—handling everything from social media calendars and business automation workflows to ad performance analytics and strategic brand positioning.\n\nMy journey began in data-driven roles, where I developed a sharp eye for optimization and systems thinking, helping teams cut inefficiencies and boost ROI. Today, that foundation empowers me to make smart, scalable decisions that fuel client success across industries like e-commerce, healthcare, tech, and professional services.\n\nWhat keeps me going? A passion for solving problems creatively, a love for marketing tools and automations, and the drive to transform ideas into tangible business impact.\n\nOutside of work, I recharge through physical activities — be it swimming, playing badminton, hitting the gym, or anything that keeps me moving and energized.\n\nLet's build, automate, and grow—better.",
		'expertise'          => array( 'Client Acquisition' ),
		'experience'         => 'Data-driven growth roles, client onboarding, full-cycle campaigns & backend operations.',
		'interests'          => array( 'Swimming', 'Badminton', 'Gym & Fitness' ),
	),
	array(
		'id'                 => 'kanika-sohal',
		'name'               => 'Kanika Sohal',
		'role'               => 'HR Manager',
		'department'         => 'People & Culture',
		'image'              => $theme_uri . '/assets/images/team/kanika-sohal.png',
		'original_photo'     => $theme_uri . '/assets/images/team/photos/kanika-sohal-photo.png',
		'original_photo_url' => 'https://www.betterinsights.in/wp-content/uploads/2025/06/PHOTO-2025-06-16-15-49-24-1-modified.png',
		'linkedin'           => 'https://www.linkedin.com/company/better-insights-bi/',
		'bio'                => "Hi, I'm Kanika Sohal, HR Manager at Better Insights with over 11 years of experience in human resource management. I hold a commerce degree from Delhi University and specialize in HR operations, employee relations, payroll/HRMS management, policy development, employee retention, strategic HR planning, and training & development.\n\nI'm passionate about building people-first, high-trust workplace cultures where employees feel valued and empowered. At Better Insights, I work closely with leadership and teams to design HR strategies that enhance engagement, support growth, and drive long-term business success.\n\nI'm known for being a quick learner, a good listener, and highly prompt in delivering tasks within deadlines. One of my key strengths is the ability to convince others while maintaining a strong work-life balance.\n\nOutside of work, I enjoy road trips to the mountains and cherish spending quality time with my family.",
		'expertise'          => array( 'Talent Acquisition' ),
		'experience'         => '11+ years in human resource management, policy development, payroll/HRMS & strategic HR planning.',
		'education'          => 'Commerce Degree, Delhi University',
		'interests'          => array( 'Road trips to the mountains', 'Spending time with family' ),
	),
	array(
		'id'                 => 'jasika-saini',
		'name'               => 'Jasika Saini',
		'role'               => 'SEO Analyst',
		'department'         => 'Search & Organic Growth',
		'image'              => $theme_uri . '/assets/images/team/jasika-saini.png',
		'original_photo'     => $theme_uri . '/assets/images/team/photos/jasika-saini-photo.png',
		'original_photo_url' => 'https://www.betterinsights.in/wp-content/uploads/2025/06/jasika-mam.png',
		'linkedin'           => 'https://www.linkedin.com/company/better-insights-bi/',
		'bio'                => "I’m a BSc. Mathematics student, totally out of the marketing industry5, but I don’t even like Mathematics at all. As Digital Marketing Industry is booming massively, so I decided to go further in this field. I joined the Digital Marketing course at Digiperform, Jaipur. Now I’m working at Better Insights. Mentors here are very helpful and clarify the doubts I have. Day to day, I always tried to perform better and learn something new. Basically, I’m an introvert. I don’t speak too much but I hope my work will. I’m confident that my work and performance will provide them with valuable results.\n\nMy special talent is…\n\nI'm proud to say that my parents always support me and give me the right advice. It was my father who told me about the digital marketing field. I’m happy that I have started earning at this younger age. I’m proud to say that I’m not stubborn and demanding at all like other people. I’m satisfied with what I have. I always wanted that whatever I do, I will do only when I am self-dependent. And I hope, one day I will fulfill it.\n\nMy thoughts on one of our company values...\n\nCompany Core values clearly represent its vision and mission. And Better Insights worked on these principles truly. I go further with one of its values i.e. “Committed to Learning”. The value of being committed to learning is beneficial for both the company and the employees. It directly impacts our personal growth and behavior.\n\noutside work...\n\nI love going to holy places and I am also a music enthusiast.",
		'expertise'          => array( 'SEO Executive' ),
		'experience'         => 'SEO & organic search analysis, performance optimization at Better Insights.',
		'education'          => 'B.Sc. Mathematics | Digital Marketing, Digiperform Jaipur',
		'interests'          => array( 'Visiting holy places', 'Music enthusiast' ),
	),
	array(
		'id'                 => 'dushyant-verma',
		'name'               => 'Dushyant Verma',
		'role'               => 'Web Developer',
		'department'         => 'Technology & Engineering',
		'image'              => $theme_uri . '/assets/images/team/dushyant-verma.webp',
		'original_photo'     => $theme_uri . '/assets/images/team/photos/dushyant-verma-photo.webp',
		'original_photo_url' => 'https://www.betterinsights.in/wp-content/uploads/2026/09/dushyant.webp',
		'linkedin'           => 'https://www.linkedin.com/company/better-insights-bi/',
		'bio'                => "Hey, I'm Dushyant Verma.\n\nBorn and brought up in Himachal Pradesh, I'm a Full Stack Developer and Website Development Specialist with a strong passion for building digital solutions that create real business impact.\n\nOver the years, I've worked extensively with WordPress, Shopify, PHP, React, Next.js, APIs, and custom web applications, helping businesses, startups, and entrepreneurs establish a strong online presence. From designing websites to developing custom functionalities and optimizing performance, I enjoy turning ideas into scalable digital products.\n\nMy journey started with curiosity about how websites work, and that curiosity eventually turned into a profession. Along the way, I explored web development, software testing, technical support, SEO, automation, and AI-powered solutions, which helped me develop a broader understanding of technology and business.\n\nCurrently, I focus on creating modern websites, e-commerce stores, custom software solutions, and AI-integrated applications. I love solving complex problems, improving user experiences, and finding smarter ways to automate workflows and processes.\n\nMy approach is simple: create, improve, and innovate continuously until the solution delivers real value.\n\nI'm always eager to learn new technologies, experiment with innovative tools, and stay updated with the latest trends in web development, AI, and digital transformation. Whether it's developing a custom WordPress plugin, building a Shopify store, integrating APIs, or creating full-stack applications, I enjoy every part of the process.\n\nBeyond work, I enjoy playing chess and badminton, traveling to new places, exploring different ideas, and challenging myself with new experiences. I also love creating new things whether it's a website, a digital product, a business idea, a content strategy, or an automation workflow. The process of turning an idea into something useful and impactful is what excites me the most.\n\nYou'll often find me learning about emerging technologies, creating content, analyzing business ideas, playing chess, planning my next project, or experimenting with AI tools to discover what’s possible.\n\nFor me, every project is an opportunity to learn, improve, and build something meaningful.",
		'expertise'          => array( 'Website Developer' ),
		'experience'         => 'Full Stack Developer & Website Specialist (WordPress, Shopify, PHP, React, Next.js, APIs, AI automations).',
		'education'          => 'Computer Science & Full Stack Web Development',
		'interests'          => array( 'Chess', 'Badminton', 'Traveling', 'Exploring AI Tools', 'Content Creation' ),
	),
	array(
		'id'                 => 'priyanka-raghuvanshi',
		'name'               => 'Priyanka Raghuvanshi',
		'role'               => 'Marketing Operations Associate',
		'department'         => 'Marketing Operations',
		'image'              => $theme_uri . '/assets/images/team/priyanka-raghuvanshi.webp',
		'original_photo'     => $theme_uri . '/assets/images/team/photos/priyanka-raghuvanshi-photo.png',
		'original_photo_url' => 'https://www.betterinsights.in/wp-content/uploads/2025/06/crop-image-1.png',
		'linkedin'           => 'https://www.linkedin.com/company/better-insights-bi/',
		'bio'                => "Hey, I'm Priyanka Raghuvanshi\n\nBorn and brought up in Pune, I've completed my B.Sc. in Computer Science. During college, I tried my hand at a mix of things content writing, fundraising, and technical internships just to explore and learn as much as I could.\n\nRight now, I'm interning at Better Insights, where I'm diving into technical research, automation tools, and AI trends. I love solving real problems, finding smarter ways to do things, and experimenting with tools like Pabbly, Notion, Zoho, ChatGPT, Gemini, and more AI tools.\n\nMy approach is pretty simple: “Do it better and better” until it feels just right.\n\nI'm curious, focused, and always ready to learn something new. Whether it's adapting to different tools or helping the team, I genuinely enjoy stepping out of my comfort zone and trying things I haven't done before.\n\nYou'll usually find me listening to music, reading random stuff, tracking cool ideas, or playing around with the latest AI tools just to see what's possible.",
		'expertise'          => array( 'Content and Brand Strategist Intern', 'Market Trends Research' ),
		'experience'         => 'Technical research, automation workflows (Pabbly, Notion, Zoho), brand strategy & AI trends.',
		'education'          => 'B.Sc. in Computer Science (Pune)',
		'interests'          => array( 'Listening to music', 'Reading', 'Exploring AI tools' ),
	),
	array(
		'id'                 => 'riya-balyan',
		'name'               => 'Riya Balyan',
		'role'               => 'Fractional HR Partner',
		'department'         => 'People Operations',
		'image'              => $theme_uri . '/assets/images/team/riya-balyan.png',
		'original_photo'     => $theme_uri . '/assets/images/team/photos/riya-balyan-photo.png',
		'original_photo_url' => 'https://www.betterinsights.in/wp-content/uploads/2025/06/PHOTO-2025-06-16-15-26-43-modified.png',
		'linkedin'           => 'https://www.linkedin.com/company/better-insights-bi/',
		'bio'                => "Hi, I’m Riya!\n\nWith 1.4 years of professional experience, currently at Better Insights, I’ve had the opportunity to dive into the full spectrum of HR, from hiring to comprehensive HR operations, including adeptly handling employee grievances.\n\nI’m deeply committed to fostering people-first, high-trust workplace cultures where every employee feels valued and empowered. My approach involves close collaboration with leadership and teams to craft HR strategies that not only boost engagement and support individual growth but also drive sustainable business success.\n\nI thrive on tackling and resolving challenges, always eager to find effective solutions, and constantly seek out new opportunities to expand my knowledge and skills. Outside of work, I love to dance, which brings a wonderful rhythm to my life, and I enjoy embarking on new trips, exploring different places and cultures. I believe these passions fuel my creativity and my desire to learn new things, both personally and professionally.",
		'expertise'          => array( 'HR Strategic' ),
		'experience'         => '1.4+ years in HR operations, talent acquisition, grievance handling & culture building.',
		'interests'          => array( 'Dancing', 'Traveling & Cultural Exploration' ),
	),
	array(
		'id'                 => 'dhruv-bisht',
		'name'               => 'Dhruv Bisht',
		'role'               => 'Video Editor Intern',
		'department'         => 'Creative & Media Production',
		'image'              => $theme_uri . '/assets/images/team/dhruv-bisht.webp',
		'original_photo'     => $theme_uri . '/assets/images/team/photos/dhruv-bisht-photo.webp',
		'original_photo_url' => 'https://www.betterinsights.in/wp-content/uploads/2026/09/dhruv.webp',
		'linkedin'           => 'https://www.linkedin.com/company/better-insights-bi/',
		'bio'                => "Hey, I'm Dhruv Bisht.  I've completed my B.Sc. in Media Graphics and Animation. I am a passionate video editor and visual  effects artist dedicated to transforming  raw footage into captivating visual stories With a keen eye for detail, seamless transitions, and cinematic effects, I craft compelling narratives that engage, inspire, and leave a lasting impact\n\nDuring my internship, I've been developing hands-on experience in video editing, motion graphics, visual storytelling, social media content, and creative post-production. I enjoy experimenting with visuals, pacing, transitions, sound, and storytelling techniques to make every video more impactful.\n\nMy internship is giving me the opportunity to work on real-world creative projects, understand professional content workflows, and continuously improve my technical and creative skills while contributing to the company's visual communication.",
		'expertise'          => array( 'Video Editor' ),
		'experience'         => 'Hands-on video editing, motion graphics, visual storytelling & post-production workflows.',
		'education'          => 'B.Sc. in Media Graphics and Animation',
		'interests'          => array( 'Visual effects', 'Cinematography', 'Sound design & transitions' ),
	),
	array(
		'id'                 => 'rishabh-panjwani',
		'name'               => 'Rishabh Panjwani',
		'role'               => 'Video Editor Intern',
		'department'         => 'Creative & Media Production',
		'image'              => $theme_uri . '/assets/images/team/rishabh-panjwani.png',
		'original_photo'     => $theme_uri . '/assets/images/team/photos/rishabh-panjwani-photo.png',
		'original_photo_url' => 'https://www.betterinsights.in/wp-content/uploads/2025/06/WhatsApp-Image-2025-06-26-at-2.44.35-PM-modified.png',
		'linkedin'           => 'https://www.linkedin.com/company/better-insights-bi/',
		'bio'                => "Hey, I'm Rishabh Panjwani. I was born and brought up in Dubai, UAE, and I've completed my B.Sc. in Media Graphics and Animation.\n\nI've spent about six months freelancing and right now I'm interning at Better Insights, where I'm sharpening my skills in video editing, cinematography, color grading, and sound design. I love bringing stories to life through visuals and always look for ways to keep improving my work.\n\nI'm someone who learns best by watching and observing—once I see how something is done, I can replicate it effectively with precision and creativity.\n\nAt Better Insights, I follow a simple yet powerful mindset—”Do it better and better.” I take pride in being adaptable and open to different editing styles, even if it means stepping out of my comfort zone and investing extra time. I actively seek out challenges that push me to explore techniques I haven’t tried before, because I believe growth comes from facing the unfamiliar.\n\nTo express true creativity, I constantly observe emerging trends, study them closely, and experiment with them—blending fresh ideas into my own unique editing approach.\n\nOutside Work\n\nI'm a gym addict who's always got music playing in the background, whether I'm lifting or just chilling. I'm great at table tennis, love capturing moments through my lens, and yes—I can definitely binge-watch like a pro!",
		'expertise'          => array( 'Video Editor', 'Sound Design' ),
		'experience'         => 'Freelance and agency video editing, cinematography, color grading & sound design.',
		'education'          => 'B.Sc. in Media Graphics and Animation',
		'interests'          => array( 'Gym & Fitness', 'Table Tennis', 'Photography', 'Music' ),
	),
);

$team_members = apply_filters( 'bi_team_members', $default_team );
$total_count  = count( $team_members );
?>

<section class="bi-about-team" id="our-team" aria-label="<?php esc_attr_e( 'The People Behind Better Insights', 'astra-child' ); ?>">
	<!-- Subtle ambient light glow -->
	<div class="bi-about-team__ambient-glow" aria-hidden="true"></div>

	<div class="bi-about-team__container">
		
		<!-- 1. SECTION INTRODUCTION -->
		<header class="bi-about-team__header">
			<span class="bi-about-team__eyebrow">
				<?php esc_html_e( 'THE PEOPLE BEHIND BETTER INSIGHTS', 'astra-child' ); ?>
			</span>
			<h2 class="bi-about-team__heading">
				<?php echo wp_kses_post( __( 'GOOD PEOPLE. <span class="bi-about-team__accent">BOLD IDEAS.</span> BETTER OUTCOMES.', 'astra-child' ) ); ?>
			</h2>
			<p class="bi-about-team__subtext">
				<?php esc_html_e( 'We bring together strategic thinking, creative problem-solving, and technical expertise to help businesses move forward. Meet the people who turn ideas into meaningful digital experiences.', 'astra-child' ); ?>
			</p>
		</header>

		<!-- 2. TEAM DIRECTORY GRID (3 columns x 3 rows on Desktop) -->
		<div class="bi-about-team__grid">
			<?php foreach ( $team_members as $index => $member ) : ?>
				<article
					class="bi-about-team__card"
					data-team-id="<?php echo esc_attr( $member['id'] ); ?>"
					data-team-index="<?php echo esc_attr( $index ); ?>"
				>
					<!-- Studio Portrait Frame -->
					<div class="bi-about-team__photo-frame">
						<?php if ( ! empty( $member['image'] ) ) : ?>
							<img
								src="<?php echo esc_url( $member['image'] ); ?>"
								alt="<?php echo esc_attr( $member['name'] . ' - ' . $member['role'] . ' at Better Insights' ); ?>"
								class="bi-about-team__photo"
								loading="lazy"
								width="500"
								height="500"
							/>
						<?php else : ?>
							<!-- Fallback Graphic -->
							<div class="bi-about-team__placeholder" aria-hidden="true">
								<svg viewBox="0 0 100 100" width="70" height="70" fill="none" stroke="currentColor" class="bi-about-team__svg">
									<circle cx="50" cy="38" r="20" stroke="#D0D3DA" stroke-width="2" />
									<path d="M20,84 C20,68 34,58 50,58 C66,58 80,68 80,84" stroke="#D0D3DA" stroke-width="2" stroke-linecap="round" />
									<circle cx="50" cy="38" r="8" fill="#000000" opacity="0.12" />
								</svg>
							</div>
						<?php endif; ?>
					</div>

					<!-- Card Information Body -->
					<div class="bi-about-team__info">
						<!-- Blue Role / Department Category Label -->
						<?php if ( ! empty( $member['department'] ) ) : ?>
							<span class="bi-about-team__dept">
								<?php echo esc_html( $member['department'] ); ?>
							</span>
						<?php endif; ?>

						<!-- Bold Black Team Member Name -->
						<h3 class="bi-about-team__name">
							<?php echo esc_html( $member['name'] ); ?>
						</h3>

						<!-- Official Job Title -->
						<p class="bi-about-team__role-title">
							<?php echo esc_html( $member['role'] ); ?>
						</p>

						<!-- Card Footer Action: View Profile Button -->
						<div class="bi-about-team__card-footer">
							<button
								type="button"
								class="bi-about-team__btn"
								data-team-modal-trigger="<?php echo esc_attr( $member['id'] ); ?>"
								aria-haspopup="dialog"
								aria-controls="bi-team-profile-modal"
								aria-label="<?php echo esc_attr( sprintf( __( 'View %s profile', 'astra-child' ), $member['name'] ) ); ?>"
							>
								<span class="bi-about-team__btn-text"><?php esc_html_e( 'VIEW PROFILE', 'astra-child' ); ?></span>
								<span class="bi-about-team__btn-icon" aria-hidden="true">↗</span>
							</button>
						</div>
					</div>
				</article>
			<?php endforeach; ?>
		</div>

	</div>

	<!-- 3. REUSABLE ACCESSIBLE PROFILE MODAL DIALOG -->
	<div
		class="bi-team-modal"
		id="bi-team-profile-modal"
		role="dialog"
		aria-modal="true"
		aria-hidden="true"
		aria-labelledby="bi-modal-employee-name"
		aria-describedby="bi-modal-employee-role"
		tabindex="-1"
	>
		<!-- Backdrop click target -->
		<div class="bi-team-modal__backdrop" data-team-modal-close aria-hidden="true"></div>

		<!-- Dialog Window -->
		<div class="bi-team-modal__dialog" role="document">
			<!-- Close Button (Always reachable at top right) -->
			<button
				type="button"
				class="bi-team-modal__close-btn"
				data-team-modal-close
				aria-label="<?php esc_attr_e( 'Close profile modal', 'astra-child' ); ?>"
			>
				<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
					<line x1="18" y1="6" x2="6" y2="18"></line>
					<line x1="6" y1="6" x2="18" y2="18"></line>
				</svg>
			</button>

			<!-- Scrollable content area -->
			<div class="bi-team-modal__scrollable">
				<div class="bi-team-modal__body">
					<!-- PROMINENT LEFT COLUMN: Original Profile Photograph -->
					<aside class="bi-team-modal__col-left">
						<div class="bi-team-modal__portrait-wrap">
							<img
								src=""
								alt=""
								class="bi-team-modal__portrait"
								id="bi-modal-employee-portrait"
								width="500"
								height="500"
							/>
						</div>

						<div class="bi-team-modal__badge" aria-label="<?php esc_attr_e( 'Better Insights Team Member', 'astra-child' ); ?>">
							<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
								<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
								<polyline points="22 4 12 14.01 9 11.01"></polyline>
							</svg>
							<span><?php esc_html_e( 'Better Insights Team', 'astra-child' ); ?></span>
						</div>
					</aside>

					<!-- RIGHT COLUMN: Name, Role, Links, Full Biography & Expertise -->
					<main class="bi-team-modal__col-right">
						<!-- Employee Identification Header -->
						<header class="bi-team-modal__header">
							<span class="bi-team-modal__dept" id="bi-modal-employee-dept"></span>
							<h2 class="bi-team-modal__name" id="bi-modal-employee-name"></h2>
							<p class="bi-team-modal__role" id="bi-modal-employee-role"></p>
							
							<!-- Available Social Profile Links (e.g. LinkedIn) -->
							<div class="bi-team-modal__links-row" id="bi-modal-links-row">
								<div id="bi-modal-employee-linkedin-wrap"></div>
							</div>
						</header>

						<!-- Complete Biography Section -->
						<section class="bi-team-modal__section bi-team-modal__section--about" id="bi-modal-about-section">
							<span class="bi-team-modal__eyebrow"><?php esc_html_e( 'ABOUT', 'astra-child' ); ?></span>
							<div class="bi-team-modal__bio" id="bi-modal-employee-bio"></div>
						</section>

						<!-- Areas of Expertise Section -->
						<section class="bi-team-modal__section bi-team-modal__section--expertise" id="bi-modal-expertise-section">
							<span class="bi-team-modal__eyebrow"><?php esc_html_e( 'AREAS OF EXPERTISE', 'astra-child' ); ?></span>
							<ul class="bi-team-modal__tags" id="bi-modal-employee-expertise" aria-label="<?php esc_attr_e( 'Areas of Expertise', 'astra-child' ); ?>"></ul>
						</section>

						<!-- Experience & Background Section -->
						<section class="bi-team-modal__section bi-team-modal__section--experience" id="bi-modal-experience-section">
							<span class="bi-team-modal__eyebrow"><?php esc_html_e( 'EXPERIENCE & BACKGROUND', 'astra-child' ); ?></span>
							<p class="bi-team-modal__detail-text" id="bi-modal-employee-experience"></p>
						</section>

						<!-- Education Section -->
						<section class="bi-team-modal__section bi-team-modal__section--education" id="bi-modal-education-section">
							<span class="bi-team-modal__eyebrow"><?php esc_html_e( 'EDUCATION', 'astra-child' ); ?></span>
							<p class="bi-team-modal__detail-text" id="bi-modal-employee-education"></p>
						</section>

						<!-- Outside Work / Interests Section -->
						<section class="bi-team-modal__section bi-team-modal__section--interests" id="bi-modal-interests-section">
							<span class="bi-team-modal__eyebrow"><?php esc_html_e( 'OUTSIDE WORK & INTERESTS', 'astra-child' ); ?></span>
							<ul class="bi-team-modal__tags bi-team-modal__tags--interests" id="bi-modal-employee-interests" aria-label="<?php esc_attr_e( 'Outside Work and Interests', 'astra-child' ); ?>"></ul>
						</section>
					</main>
				</div>
			</div>
		</div>
	</div>

	<!-- 4. STRUCTURED DATA SOURCE FOR FAST CLIENT-SIDE POPUP HYDRATION -->
	<script type="application/json" id="bi-team-modal-data">
		<?php echo wp_json_encode( $team_members ); ?>
	</script>
</section>
