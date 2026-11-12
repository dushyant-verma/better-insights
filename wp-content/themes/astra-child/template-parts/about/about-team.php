<?php
/**
 * Better Insights - About Page Section: Our Team Horizontal Gallery & Modal
 * Reference: MadeByShape (https://madebyshape.co.uk/about/)
 *
 * Implements Alpine.js architecture with x-data="entriesProfiles", continuous
 * horizontal infinite scrolling, staggered card heights & vertical offsets,
 * lime-green circular plus buttons, and authentic profile popup modal.
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
 */
$default_team = array(
	array(
		'id'                 => 'gautam-koli',
		'name'               => 'Gautam Koli',
		'role'               => 'Founder & Director',
		'department'         => 'Executive Leadership',
		'image'              => $theme_uri . '/assets/images/team/photos/gautam-koli-photo.jpg',
		'cutout'             => $theme_uri . '/assets/images/team/gautam-koli.png',
		'original_photo'     => $theme_uri . '/assets/images/team/photos/gautam-koli-photo.jpg',
		'original_photo_url' => 'https://www.betterinsights.in/wp-content/uploads/2022/08/Gautam-Koli.jpg',
		'linkedin'           => 'https://www.linkedin.com/company/better-insights-bi/',
		'bio'                => "As a seasoned professional with 7 years of experience, I bring a unique perspective to my work as a creative thinker. I am driven by my surroundings and inspired by life, allowing me to approach each project with an original and innovative mindset.\n\nI am highly dedicated to my work, consistently striving for excellence through critical thinking and a “get-it-done” attitude. My progress and success are a result of overcoming obstacles and making my work a priority.\n\nClient satisfaction is of utmost importance to me and I firmly believe that the quality of my work is worth the investment. I take a proactive approach to client relations, anticipating any potential challenges and providing long-term solutions that are tailored to their specific needs. I am committed to maintaining the trust of my clients, and I never make false promises.\n\nMy team is my greatest asset and I am proud to lead a group of highly skilled professionals who bring a unique touch to each project. By fostering an environment of trust and collaboration, we are able to achieve greater insights and make rapid progress as a unit.",
		'expertise'          => array( 'Research', 'AI Automation', 'Strategic Growth', 'Executive Leadership' ),
		'experience'         => '7+ years leading creative strategy, digital innovation, critical thinking and agency leadership.',
		'card_height'        => 440,
		'card_offset'        => 15,
	),
	array(
		'id'                 => 'dinkey-lekhwani',
		'name'               => 'Dinkey Lekhwani',
		'role'               => 'Business Development Manager',
		'department'         => 'Growth & Partnerships',
		'image'              => $theme_uri . '/assets/images/team/photos/dinkey-lekhwani-photo.png',
		'cutout'             => $theme_uri . '/assets/images/team/dinkey-lekhwani.png',
		'original_photo'     => $theme_uri . '/assets/images/team/photos/dinkey-lekhwani-photo.png',
		'original_photo_url' => 'https://www.betterinsights.in/wp-content/uploads/2025/06/dinkey-mam.png',
		'linkedin'           => 'https://www.linkedin.com/company/better-insights-bi/',
		'bio'                => "Hi, I'm Dinkey Lekhwani, Business Development Manager at Better Insights. As the Business Development Manager at Better Insights, I drive 360° growth strategies by seamlessly aligning client goals with digital execution. From leading client onboarding and managing full-cycle campaigns to streamlining backend operations, I work at the core of what makes our digital agency thrive.\n\nWith hands-on expertise in Shopify, Zoho CRM automation, Meta and Google Ads, and cross-platform integrations , I ensure every project delivers results that are not only creative but conversion-focused. My role bridges the gap between client expectations and team execution—handling everything from social media calendars and business automation workflows to ad performance analytics and strategic brand positioning.\n\nMy journey began in data-driven roles, where I developed a sharp eye for optimization and systems thinking, helping teams cut inefficiencies and boost ROI. Today, that foundation empowers me to make smart, scalable decisions that fuel client success across industries like e-commerce, healthcare, tech, and professional services.\n\nWhat keeps me going? A passion for solving problems creatively, a love for marketing tools and automations, and the drive to transform ideas into tangible business impact.\n\nOutside of work, I recharge through physical activities — be it swimming, playing badminton, hitting the gym, or anything that keeps me moving and energized.\n\nLet's build, automate, and grow—better.",
		'expertise'          => array( 'Client Acquisition', 'Shopify Stores', 'Zoho CRM Automation', 'Cross-Platform Integrations' ),
		'experience'         => 'Data-driven growth roles, client onboarding, full-cycle campaigns & backend operations.',
		'interests'          => array( 'Swimming', 'Badminton', 'Gym & Fitness' ),
		'card_height'        => 400,
		'card_offset'        => -25,
	),
	array(
		'id'                 => 'kanika-sohal',
		'name'               => 'Kanika Sohal',
		'role'               => 'HR Manager',
		'department'         => 'People & Culture',
		'image'              => $theme_uri . '/assets/images/team/photos/kanika-sohal-photo.png',
		'cutout'             => $theme_uri . '/assets/images/team/kanika-sohal.png',
		'original_photo'     => $theme_uri . '/assets/images/team/photos/kanika-sohal-photo.png',
		'original_photo_url' => 'https://www.betterinsights.in/wp-content/uploads/2025/06/PHOTO-2025-06-16-15-49-24-1-modified.png',
		'linkedin'           => 'https://www.linkedin.com/company/better-insights-bi/',
		'bio'                => "Hi, I'm Kanika Sohal, HR Manager at Better Insights with over 11 years of experience in human resource management. I hold a commerce degree from Delhi University and specialize in HR operations, employee relations, payroll/HRMS management, policy development, employee retention, strategic HR planning, and training & development.\n\nI'm passionate about building people-first, high-trust workplace cultures where employees feel valued and empowered. At Better Insights, I work closely with leadership and teams to design HR strategies that enhance engagement, support growth, and drive long-term business success.\n\nI'm known for being a quick learner, a good listener, and highly prompt in delivering tasks within deadlines. One of my key strengths is the ability to convince others while maintaining a strong work-life balance.\n\nOutside of work, I enjoy road trips to the mountains and cherish spending quality time with my family.",
		'expertise'          => array( 'Talent Acquisition', 'HR Operations', 'Employee Relations', 'Strategic HR Planning' ),
		'experience'         => '11+ years in human resource management, policy development, payroll/HRMS & strategic HR planning.',
		'education'          => 'Commerce Degree, Delhi University',
		'interests'          => array( 'Road trips to the mountains', 'Spending time with family' ),
		'card_height'        => 470,
		'card_offset'        => 30,
	),
	array(
		'id'                 => 'jasika-saini',
		'name'               => 'Jasika Saini',
		'role'               => 'SEO Analyst',
		'department'         => 'Search & Organic Growth',
		'image'              => $theme_uri . '/assets/images/team/photos/jasika-saini-photo.png',
		'cutout'             => $theme_uri . '/assets/images/team/jasika-saini.png',
		'original_photo'     => $theme_uri . '/assets/images/team/photos/jasika-saini-photo.png',
		'original_photo_url' => 'https://www.betterinsights.in/wp-content/uploads/2025/06/jasika-mam.png',
		'linkedin'           => 'https://www.linkedin.com/company/better-insights-bi/',
		'bio'                => "I’m a BSc. Mathematics student, totally out of the marketing industry, but I don’t even like Mathematics at all. As Digital Marketing Industry is booming massively, so I decided to go further in this field. I joined the Digital Marketing course at Digiperform, Jaipur. Now I’m working at Better Insights. Mentors here are very helpful and clarify the doubts I have. Day to day, I always tried to perform better and learn something new. Basically, I’m an introvert. I don’t speak too much but I hope my work will. I’m confident that my work and performance will provide them with valuable results.\n\nMy special talent is…\n\nI'm proud to say that my parents always support me and give me the right advice. It was my father who told me about the digital marketing field. I’m happy that I have started earning at this younger age. I’m proud to say that I’m not stubborn and demanding at all like other people. I’m satisfied with what I have. I always wanted that whatever I do, I will do only when I am self-dependent. And I hope, one day I will fulfill it.\n\nMy thoughts on one of our company values...\n\nCompany Core values clearly represent its vision and mission. And Better Insights worked on these principles truly. I go further with one of its values i.e. “Committed to Learning”. The value of being committed to learning is beneficial for both the company and the employees. It directly impacts our personal growth and behavior.\n\noutside work...\n\nI love going to holy places and I am also a music enthusiast.",
		'expertise'          => array( 'SEO Architecture', 'Keyword Research', 'Crawl Telemetry', 'Organic Growth' ),
		'experience'         => 'SEO & organic search analysis, performance optimization at Better Insights.',
		'education'          => 'B.Sc. Mathematics | Digital Marketing, Digiperform Jaipur',
		'interests'          => array( 'Visiting holy places', 'Music enthusiast' ),
		'card_height'        => 410,
		'card_offset'        => -20,
	),
	array(
		'id'                 => 'dushyant-verma',
		'name'               => 'Dushyant Verma',
		'role'               => 'Web Developer',
		'department'         => 'Technology & Engineering',
		'image'              => $theme_uri . '/assets/images/team/photos/dushyant-verma-photo.webp',
		'cutout'             => $theme_uri . '/assets/images/team/dushyant-verma.webp',
		'original_photo'     => $theme_uri . '/assets/images/team/photos/dushyant-verma-photo.webp',
		'original_photo_url' => 'https://www.betterinsights.in/wp-content/uploads/2026/09/dushyant.webp',
		'linkedin'           => 'https://www.linkedin.com/company/better-insights-bi/',
		'bio'                => "Hey, I'm Dushyant Verma.\n\nBorn and brought up in Himachal Pradesh, I'm a Full Stack Developer and Website Development Specialist with a strong passion for building digital solutions that create real business impact.\n\nOver the years, I've worked extensively with WordPress, Shopify, PHP, React, Next.js, APIs, and custom web applications, helping businesses, startups, and entrepreneurs establish a strong online presence. From designing websites to developing custom functionalities and optimizing performance, I enjoy turning ideas into scalable digital products.\n\nMy journey started with curiosity about how websites work, and that curiosity eventually turned into a profession. Along the way, I explored web development, software testing, technical support, SEO, automation, and AI-powered solutions, which helped me develop a broader understanding of technology and business.\n\nCurrently, I focus on creating modern websites, e-commerce stores, custom software solutions, and AI-integrated applications. I love solving complex problems, improving user experiences, and finding smarter ways to automate workflows and processes.\n\nMy approach is simple: create, improve, and innovate continuously until the solution delivers real value.\n\nI'm always eager to learn new technologies, experiment with innovative tools, and stay updated with the latest trends in web development, AI, and digital transformation. Whether it's developing a custom WordPress plugin, building a Shopify store, integrating APIs, or creating full-stack applications, I enjoy every part of the process.\n\nBeyond work, I enjoy playing chess and badminton, traveling to new places, exploring different ideas, and challenging myself with new experiences. I also love creating new things whether it's a website, a digital product, a business idea, a content strategy, or an automation workflow. The process of turning an idea into something useful and impactful is what excites me the most.\n\nYou'll often find me learning about emerging technologies, creating content, analyzing business ideas, playing chess, planning my next project, or experimenting with AI tools to discover what’s possible.\n\nFor me, every project is an opportunity to learn, improve, and build something meaningful.",
		'expertise'          => array( 'Full Stack Development', 'Next.js & React', 'Headless Architecture', 'Custom APIs & Integrations' ),
		'experience'         => 'Full Stack Developer & Website Specialist (WordPress, Shopify, PHP, React, Next.js, APIs, AI automations).',
		'education'          => 'Computer Science & Full Stack Web Development',
		'interests'          => array( 'Chess', 'Badminton', 'Traveling', 'Exploring AI Tools', 'Content Creation' ),
		'card_height'        => 460,
		'card_offset'        => 20,
	),
	array(
		'id'                 => 'priyanka-raghuvanshi',
		'name'               => 'Priyanka Raghuvanshi',
		'role'               => 'Marketing Operations Associate',
		'department'         => 'Marketing Operations',
		'image'              => $theme_uri . '/assets/images/team/photos/priyanka-raghuvanshi-photo.png',
		'cutout'             => $theme_uri . '/assets/images/team/priyanka-raghuvanshi.webp',
		'original_photo'     => $theme_uri . '/assets/images/team/photos/priyanka-raghuvanshi-photo.png',
		'original_photo_url' => 'https://www.betterinsights.in/wp-content/uploads/2025/06/crop-image-1.png',
		'linkedin'           => 'https://www.linkedin.com/company/better-insights-bi/',
		'bio'                => "Hey, I'm Priyanka Raghuvanshi\n\nBorn and brought up in Pune, I've completed my B.Sc. in Computer Science. During college, I tried my hand at a mix of things content writing, fundraising, and technical internships just to explore and learn as much as I could.\n\nRight now, I'm interning at Better Insights, where I'm diving into technical research, automation tools, and AI trends. I love solving real problems, finding smarter ways to do things, and experimenting with tools like Pabbly, Notion, Zoho, ChatGPT, Gemini, and more AI tools.\n\nMy approach is pretty simple: “Do it better and better” until it feels just right.\n\nI'm curious, focused, and always ready to learn something new. Whether it's adapting to different tools or helping the team, I genuinely enjoy stepping out of my comfort zone and trying things I haven't done before.\n\nYou'll usually find me listening to music, reading random stuff, tracking cool ideas, or playing around with the latest AI tools just to see what's possible.",
		'expertise'          => array( 'Content Strategy', 'Market Research', 'Automation Workflows', 'Brand Positioning' ),
		'experience'         => 'Technical research, automation workflows (Pabbly, Notion, Zoho), brand strategy & AI trends.',
		'education'          => 'B.Sc. in Computer Science (Pune)',
		'interests'          => array( 'Listening to music', 'Reading', 'Exploring AI tools' ),
		'card_height'        => 390,
		'card_offset'        => -30,
	),
	array(
		'id'                 => 'riya-balyan',
		'name'               => 'Riya Balyan',
		'role'               => 'Fractional HR Partner',
		'department'         => 'People Operations',
		'image'              => $theme_uri . '/assets/images/team/photos/riya-balyan-photo.png',
		'cutout'             => $theme_uri . '/assets/images/team/riya-balyan.png',
		'original_photo'     => $theme_uri . '/assets/images/team/photos/riya-balyan-photo.png',
		'original_photo_url' => 'https://www.betterinsights.in/wp-content/uploads/2025/06/PHOTO-2025-06-16-15-26-43-modified.png',
		'linkedin'           => 'https://www.linkedin.com/company/better-insights-bi/',
		'bio'                => "Hi, I’m Riya!\n\nWith 1.4 years of professional experience, currently at Better Insights, I’ve had the opportunity to dive into the full spectrum of HR, from hiring to comprehensive HR operations, including adeptly handling employee grievances.\n\nI’m deeply committed to fostering people-first, high-trust workplace cultures where every employee feels valued and empowered. My approach involves close collaboration with leadership and teams to craft HR strategies that not only boost engagement and support individual growth but also drive sustainable business success.\n\nI thrive on tackling and resolving challenges, always eager to find effective solutions, and constantly seek out new opportunities to expand my knowledge and skills. Outside of work, I love to dance, which brings a wonderful rhythm to my life, and I enjoy embarking on new trips, exploring different places and cultures. I believe these passions fuel my creativity and my desire to learn new things, both personally and professionally.",
		'expertise'          => array( 'Talent Acquisition', 'Culture Building', 'Grievance Handling', 'HR Systems' ),
		'experience'         => '1.4+ years in HR operations, talent acquisition, grievance handling & culture building.',
		'interests'          => array( 'Dancing', 'Traveling & Cultural Exploration' ),
		'card_height'        => 450,
		'card_offset'        => 10,
	),
	array(
		'id'                 => 'dhruv-bisht',
		'name'               => 'Dhruv Bisht',
		'role'               => 'Video Editor Intern',
		'department'         => 'Creative & Media Production',
		'image'              => $theme_uri . '/assets/images/team/photos/dhruv-bisht-photo.webp',
		'cutout'             => $theme_uri . '/assets/images/team/dhruv-bisht.webp',
		'original_photo'     => $theme_uri . '/assets/images/team/photos/dhruv-bisht-photo.webp',
		'original_photo_url' => 'https://www.betterinsights.in/wp-content/uploads/2026/09/dhruv.webp',
		'linkedin'           => 'https://www.linkedin.com/company/better-insights-bi/',
		'bio'                => "Hey, I'm Dhruv Bisht.  I've completed my B.Sc. in Media Graphics and Animation. I am a passionate video editor and visual effects artist dedicated to transforming raw footage into captivating visual stories. With a keen eye for detail, seamless transitions, and cinematic effects, I craft compelling narratives that engage, inspire, and leave a lasting impact.\n\nDuring my internship, I've been developing hands-on experience in video editing, motion graphics, visual storytelling, social media content, and creative post-production. I enjoy experimenting with visuals, pacing, transitions, sound, and storytelling techniques to make every video more impactful.\n\nMy internship is giving me the opportunity to work on real-world creative projects, understand professional content workflows, and continuously improve my technical and creative skills while contributing to the company's visual communication.",
		'expertise'          => array( 'Motion Graphics', 'Cinematic VFX', 'Post-Production', 'Pacing & Narrative' ),
		'experience'         => 'Hands-on video editing, motion graphics, visual storytelling & post-production workflows.',
		'education'          => 'B.Sc. in Media Graphics and Animation',
		'interests'          => array( 'Visual effects', 'Cinematography', 'Sound design & transitions' ),
		'card_height'        => 420,
		'card_offset'        => -15,
	),
	array(
		'id'                 => 'rishabh-panjwani',
		'name'               => 'Rishabh Panjwani',
		'role'               => 'Video Editor Intern',
		'department'         => 'Creative & Media Production',
		'image'              => $theme_uri . '/assets/images/team/photos/rishabh-panjwani-photo.png',
		'cutout'             => $theme_uri . '/assets/images/team/rishabh-panjwani.png',
		'original_photo'     => $theme_uri . '/assets/images/team/photos/rishabh-panjwani-photo.png',
		'original_photo_url' => 'https://www.betterinsights.in/wp-content/uploads/2025/06/WhatsApp-Image-2025-06-26-at-2.44.35-PM-modified.png',
		'linkedin'           => 'https://www.linkedin.com/company/better-insights-bi/',
		'bio'                => "Hey, I'm Rishabh Panjwani. I was born and brought up in Dubai, UAE, and I've completed my B.Sc. in Media Graphics and Animation.\n\nI've spent about six months freelancing and right now I'm interning at Better Insights, where I'm sharpening my skills in video editing, cinematography, color grading, and sound design. I love bringing stories to life through visuals and always look for ways to keep improving my work.\n\nI'm someone who learns best by watching and observing—once I see how something is done, I can replicate it effectively with precision and creativity.\n\nAt Better Insights, I follow a simple yet powerful mindset—”Do it better and better.” I take pride in being adaptable and open to different editing styles, even if it means stepping out of my comfort zone and investing extra time. I actively seek out challenges that push me to explore techniques I haven’t tried before, because I believe growth comes from facing the unfamiliar.\n\nTo express true creativity, I constantly observe emerging trends, study them closely, and experiment with them—blending fresh ideas into my own unique editing approach.\n\nOutside Work\n\nI'm a gym addict who's always got music playing in the background, whether I'm lifting or just chilling. I'm great at table tennis, love capturing moments through my lens, and yes—I can definitely binge-watch like a pro!",
		'expertise'          => array( 'Color Grading', 'Sound Design', 'Short-form Narrative', 'Creative Direction' ),
		'experience'         => 'Freelance and agency video editing, cinematography, color grading & sound design.',
		'education'          => 'B.Sc. in Media Graphics and Animation',
		'interests'          => array( 'Gym & Fitness', 'Table Tennis', 'Photography', 'Music' ),
		'card_height'        => 460,
		'card_offset'        => 25,
	),
);

$team_members = apply_filters( 'bi_team_members', $default_team );

// Duplicated sequence for seamless continuous infinite horizontal scroll
$loop_cards = array_merge( $team_members, $team_members );
?>

<section
	class="bi-about-team"
	id="our-team"
	x-data="entriesProfiles"
	aria-label="<?php esc_attr_e( 'The People Behind Better Insights', 'astra-child' ); ?>"
>
	<!-- Ambient subtle dark background glow -->
	<div class="bi-about-team__ambient-glow" aria-hidden="true"></div>

	<!-- 1. SECTION INTRODUCTION (MadeByShape Reference Style) -->
	<div class="bi-about-team__intro">
		<div class="bi-about-team__eyebrow">
			<span class="bi-about-team__eyebrow-dot" aria-hidden="true">&bull;</span>
			<span><?php esc_html_e( 'Our Team', 'astra-child' ); ?></span>
		</div>
		<h2 class="bi-about-team__heading">
			<?php esc_html_e( 'Multiple personalities,', 'astra-child' ); ?><br />
			<?php esc_html_e( 'No egos.', 'astra-child' ); ?>
		</h2>
	</div>

	<!-- 2. CONTINUOUS HORIZONTAL INFINITE SCROLLING GALLERY -->
	<div
		class="bi-team-gallery-wrap"
		role="region"
		aria-label="<?php esc_attr_e( 'Horizontally scrolling team member profiles', 'astra-child' ); ?>"
		@mouseenter="pause()"
		@mouseleave="resume()"
		@pointerdown="startDrag($event)"
		@pointermove="onDrag($event)"
		@pointerup="endDrag()"
		@pointercancel="endDrag()"
		@pointerleave="endDrag()"
	>
		<div
			class="bi-team-gallery-track"
			x-ref="track"
		>
			<?php foreach ( $loop_cards as $index => $member ) : ?>
				<?php
				$is_duplicate = $index >= count( $team_members );
				$card_height  = isset( $member['card_height'] ) ? (int) $member['card_height'] : 430;
				$card_offset  = isset( $member['card_offset'] ) ? (int) $member['card_offset'] : 0;
				$member_id    = esc_attr( $member['id'] );
				?>
				<div
					class="bi-team-card-holder"
					style="--card-height: <?php echo esc_attr( $card_height ); ?>px; --card-offset: <?php echo esc_attr( $card_offset ); ?>px;"
					<?php echo $is_duplicate ? 'aria-hidden="true"' : ''; ?>
				>
					<article
						class="bi-team-card"
						@click="openProfileById('<?php echo esc_js( $member['id'] ); ?>', $event)"
						tabindex="<?php echo $is_duplicate ? '-1' : '0'; ?>"
						role="button"
						aria-label="<?php echo esc_attr( sprintf( __( 'View %s profile: %s', 'astra-child' ), $member['name'], $member['role'] ) ); ?>"
						@keydown.enter="openProfileById('<?php echo esc_js( $member['id'] ); ?>', $event)"
						@keydown.space.prevent="openProfileById('<?php echo esc_js( $member['id'] ); ?>', $event)"
					>
						<!-- Portrait Photograph Frame -->
						<div class="bi-team-card__photo-frame">
							<img
								src="<?php echo esc_url( $member['image'] ); ?>"
								alt="<?php echo esc_attr( $member['name'] . ' - ' . $member['role'] ); ?>"
								class="bi-team-card__photo"
								loading="<?php echo $index < 4 ? 'eager' : 'lazy'; ?>"
								draggable="false"
							/>
						</div>

						<!-- Card Dark Gradient Overlay (Legibility) -->
						<div class="bi-team-card__scrim" aria-hidden="true"></div>

						<!-- Top-Right Actions: Lime-Green Plus Button & Optional LinkedIn -->
						<div class="bi-team-card__top-actions">
							<?php if ( ! empty( $member['linkedin'] ) ) : ?>
								<a
									href="<?php echo esc_url( $member['linkedin'] ); ?>"
									target="_blank"
									rel="noopener noreferrer"
									class="bi-team-card__linkedin-btn"
									@click.stop
									aria-label="<?php echo esc_attr( sprintf( __( '%s on LinkedIn (opens in new tab)', 'astra-child' ), $member['name'] ) ); ?>"
									tabindex="<?php echo $is_duplicate ? '-1' : '0'; ?>"
								>
									<svg viewBox="0 0 24 24" width="13" height="13" fill="currentColor" aria-hidden="true">
										<path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
									</svg>
								</a>
							<?php endif; ?>

							<button
								type="button"
								class="bi-team-card__plus-btn"
								@click.stop="openProfileById('<?php echo esc_js( $member['id'] ); ?>', $event)"
								aria-haspopup="dialog"
								aria-label="<?php echo esc_attr( sprintf( __( 'Open %s details', 'astra-child' ), $member['name'] ) ); ?>"
								tabindex="<?php echo $is_duplicate ? '-1' : '0'; ?>"
							>
								<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
									<line x1="12" y1="5" x2="12" y2="19"></line>
									<line x1="5" y1="12" x2="19" y2="12"></line>
								</svg>
							</button>
						</div>

						<!-- Bottom-Left Label: Name & Designation -->
						<div class="bi-team-card__content">
							<h3 class="bi-team-card__name">
								<?php echo esc_html( $member['name'] ); ?>
							</h3>
							<p class="bi-team-card__role">
								<?php echo esc_html( $member['role'] ); ?>
							</p>
						</div>
					</article>
				</div>
			<?php endforeach; ?>
		</div>
	</div>

	<!-- 3. CENTERED LIME-GREEN PILL CTA BUTTON (MadeByShape Reference) -->
	<div class="bi-team-cta-wrap">
		<a
			href="<?php echo esc_url( home_url( '/careers' ) ); ?>"
			class="bi-team-cta-btn"
			aria-label="<?php esc_attr_e( 'Meet the whole Team - Explore Better Insights Careers & Team', 'astra-child' ); ?>"
		>
			<span class="bi-team-cta-btn__text"><?php esc_html_e( 'Meet the whole Team', 'astra-child' ); ?></span>
			<span class="bi-team-cta-arrow" aria-hidden="true">↗</span>
		</a>
	</div>

	<!-- 4. REUSABLE ACCESSIBLE PROFILE MODAL DIALOG (Alpine Controlled) -->
	<div
		class="bi-team-modal"
		id="bi-team-profile-modal"
		x-show="isModalOpen"
		x-transition:enter="bi-modal-enter"
		x-transition:enter-start="bi-modal-enter-start"
		x-transition:enter-end="bi-modal-enter-end"
		x-transition:leave="bi-modal-leave"
		x-transition:leave-start="bi-modal-leave-start"
		x-transition:leave-end="bi-modal-leave-end"
		role="dialog"
		aria-modal="true"
		:aria-hidden="(!isModalOpen).toString()"
		@keydown.escape.window="closeModal()"
		style="display: none;"
	>
		<!-- Backdrop click target -->
		<div
			class="bi-team-modal__backdrop"
			@click="closeModal()"
			aria-hidden="true"
		></div>

		<!-- Dialog card container -->
		<div class="bi-team-modal__dialog" role="document">
			<!-- Close Button (Top-Right) -->
			<button
				type="button"
				class="bi-team-modal__close-btn"
				@click="closeModal()"
				aria-label="<?php esc_attr_e( 'Close profile modal', 'astra-child' ); ?>"
			>
				<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
					<line x1="18" y1="6" x2="6" y2="18" />
					<line x1="6" y1="6" x2="18" y2="18" />
				</svg>
			</button>

			<div class="bi-team-modal__body">
				<!-- LEFT COLUMN: Authentic Portrait Photo -->
				<div class="bi-team-modal__media">
					<img
						:src="activeMember ? (activeMember.original_photo || activeMember.image) : ''"
						:alt="activeMember ? activeMember.name : ''"
						class="bi-team-modal__portrait"
					/>
				</div>

				<!-- RIGHT COLUMN: Complete Editorial Profile Info -->
				<div class="bi-team-modal__scrollable">
					<!-- Department Tag -->
					<div class="bi-team-modal__dept" x-show="activeMember && activeMember.department" x-text="activeMember ? activeMember.department : ''"></div>

					<!-- Member Name -->
					<h3 class="bi-team-modal__name" x-text="activeMember ? activeMember.name : ''"></h3>

					<!-- Job Role -->
					<p class="bi-team-modal__role" x-text="activeMember ? activeMember.role : ''"></p>

					<!-- Biography Paragraphs -->
					<div class="bi-team-modal__bio-section" x-show="activeMember && activeMember.bio">
						<h4 class="bi-team-modal__section-title"><?php esc_html_e( 'About', 'astra-child' ); ?></h4>
						<div class="bi-team-modal__bio" x-html="activeMember ? formatBio(activeMember.bio) : ''"></div>
					</div>

					<!-- Areas of Expertise -->
					<div class="bi-team-modal__section" x-show="activeMember && activeMember.expertise && activeMember.expertise.length">
						<h4 class="bi-team-modal__section-title"><?php esc_html_e( 'Areas of Expertise', 'astra-child' ); ?></h4>
						<ul class="bi-team-modal__tags">
							<template x-for="(skill, sIdx) in (activeMember ? activeMember.expertise : [])" :key="sIdx">
								<li class="bi-team-modal__tag" x-text="skill"></li>
							</template>
						</ul>
					</div>

					<!-- Professional Experience -->
					<div class="bi-team-modal__section" x-show="activeMember && activeMember.experience">
						<h4 class="bi-team-modal__section-title"><?php esc_html_e( 'Experience & Background', 'astra-child' ); ?></h4>
						<p class="bi-team-modal__text" x-text="activeMember ? activeMember.experience : ''"></p>
					</div>

					<!-- Education -->
					<div class="bi-team-modal__section" x-show="activeMember && activeMember.education">
						<h4 class="bi-team-modal__section-title"><?php esc_html_e( 'Education', 'astra-child' ); ?></h4>
						<p class="bi-team-modal__text" x-text="activeMember ? activeMember.education : ''"></p>
					</div>

					<!-- Interests Outside Work -->
					<div class="bi-team-modal__section" x-show="activeMember && activeMember.interests && activeMember.interests.length">
						<h4 class="bi-team-modal__section-title"><?php esc_html_e( 'Outside Work & Interests', 'astra-child' ); ?></h4>
						<ul class="bi-team-modal__tags">
							<template x-for="(interest, iIdx) in (activeMember ? activeMember.interests : [])" :key="iIdx">
								<li class="bi-team-modal__tag bi-team-modal__tag--interest" x-text="interest"></li>
							</template>
						</ul>
					</div>

					<!-- Social / LinkedIn Link -->
					<div class="bi-team-modal__links" x-show="activeMember && activeMember.linkedin">
						<a
							:href="activeMember ? activeMember.linkedin : '#'"
							target="_blank"
							rel="noopener noreferrer"
							class="bi-team-modal__linkedin-btn"
						>
							<svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true">
								<path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
							</svg>
							<span><?php esc_html_e( 'Connect on LinkedIn ↗', 'astra-child' ); ?></span>
						</a>
					</div>
				</div>
			</div>
		</div>
	</div>

	<!-- Raw team data injected for Alpine.js entriesProfiles -->
	<script id="bi-team-modal-data" type="application/json">
		<?php echo wp_json_encode( $team_members ); ?>
	</script>
</section>
