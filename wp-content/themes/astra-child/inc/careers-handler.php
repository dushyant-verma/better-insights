<?php
/**
 * Better Insights - Careers Application System Backend Handler
 *
 * Manages job applications, secure resume uploads, CPT 'bi_application',
 * custom admin dashboard, configurable email notifications, and AJAX processing.
 *
 * @package Astra_Child
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * --------------------------------------------------------------------------
 * 1. Register 'bi_application' Custom Post Type & Status System
 * --------------------------------------------------------------------------
 */
function bi_register_career_application_cpt() {
	$labels = array(
		'name'               => _x( 'Career Applications', 'post type general name', 'astra-child' ),
		'singular_name'      => _x( 'Application', 'post type singular name', 'astra-child' ),
		'menu_name'          => _x( 'Career Applications', 'admin menu', 'astra-child' ),
		'name_admin_bar'     => _x( 'Application', 'add new on admin bar', 'astra-child' ),
		'add_new'            => _x( 'Add New', 'application', 'astra-child' ),
		'add_new_item'       => __( 'Add New Application', 'astra-child' ),
		'new_item'           => __( 'New Application', 'astra-child' ),
		'edit_item'          => __( 'Review Application', 'astra-child' ),
		'view_item'          => __( 'View Application', 'astra-child' ),
		'all_items'          => __( 'All Applications', 'astra-child' ),
		'search_items'       => __( 'Search Applications', 'astra-child' ),
		'not_found'          => __( 'No applications found.', 'astra-child' ),
		'not_found_in_trash' => __( 'No applications found in Trash.', 'astra-child' ),
	);

	$args = array(
		'labels'             => $labels,
		'public'             => false,
		'publicly_queryable' => false,
		'show_ui'            => true,
		'show_in_menu'       => true,
		'query_var'          => false,
		'rewrite'            => false,
		'capability_type'    => 'post',
		'capabilities'       => array(
			'create_posts' => 'do_not_allow', // Created via applicant submission only
		),
		'map_meta_cap'       => true,
		'has_archive'        => false,
		'hierarchical'       => false,
		'menu_position'      => 27,
		'menu_icon'          => 'dashicons-id-alt',
		'supports'           => array( 'title' ),
	);

	register_post_type( 'bi_application', $args );
}
add_action( 'init', 'bi_register_career_application_cpt' );

/**
 * Get available application statuses with labels and styles.
 *
 * @return array
 */
function bi_get_application_statuses() {
	return array(
		'new'         => array(
			'label' => __( 'New', 'astra-child' ),
			'bg'    => '#000000',
			'color' => '#FFFFFF',
		),
		'reviewing'   => array(
			'label' => __( 'Reviewing', 'astra-child' ),
			'bg'    => '#F3F2EF',
			'color' => '#000000',
			'border'=> '#D0D3DA',
		),
		'shortlisted' => array(
			'label' => __( 'Shortlisted', 'astra-child' ),
			'bg'    => '#E6F4EA',
			'color' => '#137333',
			'border'=> '#CEEAD6',
		),
		'rejected'    => array(
			'label' => __( 'Rejected', 'astra-child' ),
			'bg'    => '#FCE8E6',
			'color' => '#C5221F',
			'border'=> '#FAD2CF',
		),
		'hired'       => array(
			'label' => __( 'Hired', 'astra-child' ),
			'bg'    => '#171717',
			'color' => '#FFFFFF',
		),
	);
}

/**
 * --------------------------------------------------------------------------
 * 2. Secure Resume Storage Directory Setup
 * --------------------------------------------------------------------------
 */
function bi_get_resume_upload_dir() {
	$upload_dir = wp_upload_dir();
	$resumes_dir = trailingslashit( $upload_dir['basedir'] ) . 'bi-resumes';

	if ( ! file_exists( $resumes_dir ) ) {
		wp_mkdir_p( $resumes_dir );

		// Protect directory with .htaccess and blank index.php
		$htaccess_file = trailingslashit( $resumes_dir ) . '.htaccess';
		if ( ! file_exists( $htaccess_file ) ) {
			$htaccess_content = "# Prevent direct HTTP access to candidate resumes\n<IfModule mod_authz_core.c>\n    Require all denied\n</IfModule>\n<IfModule !mod_authz_core.c>\n    Order deny,allow\n    Deny from all\n</IfModule>\nOptions -Indexes -ExecCGI\n";
			file_put_contents( $htaccess_file, $htaccess_content );
		}

		$index_file = trailingslashit( $resumes_dir ) . 'index.php';
		if ( ! file_exists( $index_file ) ) {
			file_put_contents( $index_file, "<?php\n// Silence is golden.\n" );
		}
	}

	return $resumes_dir;
}

/**
 * --------------------------------------------------------------------------
 * 3. Custom Admin Columns for 'bi_application'
 * --------------------------------------------------------------------------
 */
function bi_application_custom_columns( $columns ) {
	$new_columns = array(
		'cb'           => $columns['cb'],
		'title'        => __( 'Applicant Name', 'astra-child' ),
		'position'     => __( 'Position Applied For', 'astra-child' ),
		'contact'      => __( 'Contact Details', 'astra-child' ),
		'status'       => __( 'Status', 'astra-child' ),
		'resume'       => __( 'Resume / CV', 'astra-child' ),
		'email_status' => __( 'Notification', 'astra-child' ),
		'date'         => __( 'Submitted Date', 'astra-child' ),
	);
	return $new_columns;
}
add_filter( 'manage_bi_application_posts_columns', 'bi_application_custom_columns' );

function bi_application_custom_column_content( $column, $post_id ) {
	$statuses = bi_get_application_statuses();

	switch ( $column ) {
		case 'position':
			$position = get_post_meta( $post_id, '_bi_app_position', true );
			echo '<strong>' . esc_html( $position ? $position : 'General Application' ) . '</strong>';
			break;

		case 'contact':
			$email = get_post_meta( $post_id, '_bi_app_email', true );
			$phone = get_post_meta( $post_id, '_bi_app_phone', true );
			if ( $email ) {
				echo '<div style="margin-bottom:3px;"><a href="mailto:' . esc_attr( $email ) . '">' . esc_html( $email ) . '</a></div>';
			}
			if ( $phone ) {
				echo '<div style="color:#6A6A6A; font-size:12px;"><a href="tel:' . esc_attr( $phone ) . '" style="color:#6A6A6A;">' . esc_html( $phone ) . '</a></div>';
			}
			break;

		case 'status':
			$current_status = get_post_meta( $post_id, '_bi_app_status', true );
			if ( ! $current_status || ! isset( $statuses[ $current_status ] ) ) {
				$current_status = 'new';
			}
			$st = $statuses[ $current_status ];
			$border = isset( $st['border'] ) ? 'border:1px solid ' . esc_attr( $st['border'] ) . ';' : '';
			echo '<span style="display:inline-block; padding:4px 10px; border-radius:999px; font-size:11.5px; font-weight:700; text-transform:uppercase; letter-spacing:0.04em; background:' . esc_attr( $st['bg'] ) . '; color:' . esc_attr( $st['color'] ) . ';' . $border . '">';
			echo esc_html( $st['label'] );
			echo '</span>';
			break;

		case 'resume':
			$resume_name = get_post_meta( $post_id, '_bi_app_resume_filename', true );
			$resume_path = get_post_meta( $post_id, '_bi_app_resume_path', true );
			$resume_size = get_post_meta( $post_id, '_bi_app_resume_size', true );

			if ( $resume_path && file_exists( $resume_path ) ) {
				$download_url = wp_nonce_url(
					admin_url( 'admin-post.php?action=bi_download_resume&id=' . $post_id ),
					'bi_download_resume_' . $post_id
				);
				echo '<a href="' . esc_url( $download_url ) . '" class="button button-small" style="display:inline-flex; align-items:center; gap:4px;" title="' . esc_attr( $resume_name ) . '">';
				echo '<span class="dashicons dashicons-download" style="font-size:14px; width:14px; height:14px; line-height:14px;"></span> ';
				echo esc_html__( 'Download', 'astra-child' );
				if ( $resume_size ) {
					echo ' <span style="color:#888; font-size:11px;">(' . esc_html( $resume_size ) . ')</span>';
				}
				echo '</a>';
			} else {
				echo '<span style="color:#999; font-size:12px;">' . esc_html__( 'No file', 'astra-child' ) . '</span>';
			}
			break;

		case 'email_status':
			$admin_mail = get_post_meta( $post_id, '_bi_app_admin_email_status', true );
			if ( 'sent' === $admin_mail ) {
				echo '<span style="color:#137333; font-size:12px; font-weight:600;">&#10003; ' . esc_html__( 'Sent', 'astra-child' ) . '</span>';
			} elseif ( 'disabled' === $admin_mail ) {
				echo '<span style="color:#888; font-size:12px;">' . esc_html__( 'Disabled', 'astra-child' ) . '</span>';
			} elseif ( 'failed' === $admin_mail ) {
				$err = get_post_meta( $post_id, '_bi_app_admin_email_error', true );
				echo '<span style="color:#C5221F; font-size:12px; font-weight:600;" title="' . esc_attr( $err ) . '">&#10007; ' . esc_html__( 'Failed', 'astra-child' ) . '</span>';
			} else {
				echo '&mdash;';
			}
			break;
	}
}
add_action( 'manage_bi_application_posts_custom_column', 'bi_application_custom_column_content', 10, 2 );

/**
 * Filter applications by Status in admin list.
 */
function bi_application_admin_filters( $post_type ) {
	if ( 'bi_application' !== $post_type ) {
		return;
	}

	$current_status = isset( $_GET['app_status'] ) ? sanitize_key( $_GET['app_status'] ) : '';
	$statuses       = bi_get_application_statuses();

	echo '<select name="app_status">';
	echo '<option value="">' . esc_html__( 'All Statuses', 'astra-child' ) . '</option>';
	foreach ( $statuses as $key => $data ) {
		printf(
			'<option value="%s"%s>%s</option>',
			esc_attr( $key ),
			selected( $current_status, $key, false ),
			esc_html( $data['label'] )
		);
	}
	echo '</select>';
}
add_action( 'restrict_manage_posts', 'bi_application_admin_filters' );

/**
 * Modify query for Status Filter & Search in admin.
 */
function bi_application_filter_query( $query ) {
	global $pagenow;
	if ( ! is_admin() || 'edit.php' !== $pagenow || ! $query->is_main_query() ) {
		return;
	}

	if ( 'bi_application' !== $query->get( 'post_type' ) ) {
		return;
	}

	// Filter by Status
	if ( ! empty( $_GET['app_status'] ) ) {
		$status = sanitize_key( $_GET['app_status'] );
		$meta_query = $query->get( 'meta_query' );
		if ( ! is_array( $meta_query ) ) {
			$meta_query = array();
		}
		$meta_query[] = array(
			'key'     => '_bi_app_status',
			'value'   => $status,
			'compare' => '=',
		);
		$query->set( 'meta_query', $meta_query );
	}
}
add_filter( 'parse_query', 'bi_application_filter_query' );

/**
 * --------------------------------------------------------------------------
 * 4. Dedicated Meta Boxes / Application Review Screen
 * --------------------------------------------------------------------------
 */
function bi_add_application_meta_boxes() {
	// Main Review Box
	add_meta_box(
		'bi_application_details',
		__( 'Application Dossier & Candidate Profile', 'astra-child' ),
		'bi_render_application_details_meta_box',
		'bi_application',
		'normal',
		'high'
	);

	// Status & Recruitment Actions Box (Side)
	add_meta_box(
		'bi_application_actions',
		__( 'Status & Hiring Actions', 'astra-child' ),
		'bi_render_application_actions_meta_box',
		'bi_application',
		'side',
		'high'
	);
}
add_action( 'add_meta_boxes_bi_application', 'bi_add_application_meta_boxes' );

function bi_render_application_details_meta_box( $post ) {
	$full_name    = get_post_meta( $post->ID, '_bi_app_full_name', true );
	$email        = get_post_meta( $post->ID, '_bi_app_email', true );
	$phone        = get_post_meta( $post->ID, '_bi_app_phone', true );
	$position     = get_post_meta( $post->ID, '_bi_app_position', true );
	$linkedin     = get_post_meta( $post->ID, '_bi_app_linkedin', true );
	$cover_letter = get_post_meta( $post->ID, '_bi_app_cover_letter', true );
	$resume_name  = get_post_meta( $post->ID, '_bi_app_resume_filename', true );
	$resume_path  = get_post_meta( $post->ID, '_bi_app_resume_path', true );
	$resume_size  = get_post_meta( $post->ID, '_bi_app_resume_size', true );
	$resume_mime  = get_post_meta( $post->ID, '_bi_app_resume_mime', true );
	$submitted_at = get_post_meta( $post->ID, '_bi_app_submitted_at', true );
	$ip_addr      = get_post_meta( $post->ID, '_bi_app_ip', true );
	$admin_mail   = get_post_meta( $post->ID, '_bi_app_admin_email_status', true );
	$admin_err    = get_post_meta( $post->ID, '_bi_app_admin_email_error', true );
	$ack_mail     = get_post_meta( $post->ID, '_bi_app_applicant_email_status', true );
	?>
	<div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif; color:#1d2327;">
		
		<!-- Candidate Overview Header -->
		<div style="background:#F3F2EF; padding:20px 24px; border-radius:8px; margin-bottom:24px; border:1px solid #E5E5E5; display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:16px;">
			<div>
				<div style="font-size:11px; text-transform:uppercase; letter-spacing:0.1em; color:#6A6A6A; font-weight:700; margin-bottom:4px;"><?php esc_html_e( 'Position Applied For', 'astra-child' ); ?></div>
				<h2 style="margin:0; font-size:22px; font-weight:700; color:#000000;"><?php echo esc_html( $position ? $position : 'General Application' ); ?></h2>
			</div>
			<div style="text-align:right;">
				<div style="font-size:11px; text-transform:uppercase; letter-spacing:0.1em; color:#6A6A6A; font-weight:700; margin-bottom:4px;"><?php esc_html_e( 'Submitted', 'astra-child' ); ?></div>
				<div style="font-size:14px; font-weight:600; color:#000000;"><?php echo esc_html( $submitted_at ? $submitted_at : get_the_date( 'Y-m-d H:i:s', $post ) ); ?></div>
			</div>
		</div>

		<!-- Details Grid -->
		<table class="widefat striped" style="border:1px solid #E5E5E5; border-radius:6px; margin-bottom:24px;">
			<tbody>
				<tr>
					<th style="width:200px; font-weight:600; padding:12px 16px;"><?php esc_html_e( 'Candidate Full Name', 'astra-child' ); ?></th>
					<td style="padding:12px 16px; font-size:15px; font-weight:600;"><?php echo esc_html( $full_name ); ?></td>
				</tr>
				<tr>
					<th style="font-weight:600; padding:12px 16px;"><?php esc_html_e( 'Email Address', 'astra-child' ); ?></th>
					<td style="padding:12px 16px;">
						<?php if ( $email ) : ?>
							<a href="mailto:<?php echo esc_attr( $email ); ?>" style="font-weight:600; text-decoration:underline;">
								<?php echo esc_html( $email ); ?>
							</a>
							<a href="mailto:<?php echo esc_attr( $email ); ?>" class="button button-small" style="margin-left:12px;">
								<span class="dashicons dashicons-email" style="font-size:14px; width:14px; height:14px; line-height:14px;"></span>
								<?php esc_html_e( 'Compose Email', 'astra-child' ); ?>
							</a>
						<?php else : ?>
							&mdash;
						<?php endif; ?>
					</td>
				</tr>
				<tr>
					<th style="font-weight:600; padding:12px 16px;"><?php esc_html_e( 'Phone Number', 'astra-child' ); ?></th>
					<td style="padding:12px 16px;">
						<?php if ( $phone ) : ?>
							<a href="tel:<?php echo esc_attr( $phone ); ?>" style="font-weight:600;">
								<?php echo esc_html( $phone ); ?>
							</a>
						<?php else : ?>
							&mdash;
						<?php endif; ?>
					</td>
				</tr>
				<tr>
					<th style="font-weight:600; padding:12px 16px;"><?php esc_html_e( 'LinkedIn Profile', 'astra-child' ); ?></th>
					<td style="padding:12px 16px;">
						<?php if ( $linkedin ) : ?>
							<a href="<?php echo esc_url( $linkedin ); ?>" target="_blank" rel="noopener noreferrer" style="display:inline-flex; align-items:center; gap:6px; font-weight:600;">
								<span><?php echo esc_html( $linkedin ); ?></span>
								<span class="dashicons dashicons-external" style="font-size:14px; width:14px; height:14px; line-height:14px;"></span>
							</a>
						<?php else : ?>
							<span style="color:#888;"><?php esc_html_e( 'Not provided', 'astra-child' ); ?></span>
						<?php endif; ?>
					</td>
				</tr>
				<tr>
					<th style="font-weight:600; padding:12px 16px;"><?php esc_html_e( 'Resume / Curriculum Vitae', 'astra-child' ); ?></th>
					<td style="padding:12px 16px;">
						<?php if ( $resume_path && file_exists( $resume_path ) ) : ?>
							<?php
							$download_url = wp_nonce_url(
								admin_url( 'admin-post.php?action=bi_download_resume&id=' . $post->ID ),
								'bi_download_resume_' . $post->ID
							);
							?>
							<div style="background:#FFFFFF; border:1px solid #D0D3DA; border-radius:6px; padding:12px 16px; display:inline-flex; align-items:center; gap:16px;">
								<span class="dashicons dashicons-media-document" style="font-size:32px; width:32px; height:32px; color:#000000;"></span>
								<div>
									<div style="font-weight:700; color:#000000; font-size:14px;"><?php echo esc_html( $resume_name ); ?></div>
									<div style="color:#6A6A6A; font-size:12px;">
										<?php echo esc_html( $resume_size ? $resume_size : '' ); ?>
										<?php if ( $resume_mime ) : ?>
											&bull; <?php echo esc_html( $resume_mime ); ?>
										<?php endif; ?>
									</div>
								</div>
								<a href="<?php echo esc_url( $download_url ); ?>" class="button button-primary" style="margin-left:12px; background:#000000; border-color:#000000;">
									<span class="dashicons dashicons-download" style="font-size:14px; width:14px; height:14px; line-height:14px; margin-top:4px;"></span>
									<?php esc_html_e( 'Download Resume Securely', 'astra-child' ); ?>
								</a>
							</div>
						<?php else : ?>
							<span style="color:#C5221F;"><?php esc_html_e( 'File not found on server or was deleted.', 'astra-child' ); ?></span>
						<?php endif; ?>
					</td>
				</tr>
			</tbody>
		</table>

		<!-- Cover Letter / Message Section -->
		<div style="margin-bottom:24px;">
			<h3 style="font-size:15px; font-weight:700; margin:0 0 10px; color:#000000;"><?php esc_html_e( 'Cover Letter / Candidate Message', 'astra-child' ); ?></h3>
			<div style="background:#F9FAFB; border:1px solid #E5E5E5; border-radius:6px; padding:18px 20px; font-size:14px; line-height:1.7; color:#2D3748; white-space:pre-wrap; min-height:80px;">
				<?php echo $cover_letter ? esc_html( $cover_letter ) : '<em>' . esc_html__( 'No cover letter or message was provided.', 'astra-child' ) . '</em>'; ?>
			</div>
		</div>

		<!-- Audit & Security Metadata -->
		<div style="background:#FFFFFF; border:1px solid #E5E5E5; border-radius:6px; padding:14px 18px; font-size:12px; color:#6A6A6A; line-height:1.8;">
			<div><strong><?php esc_html_e( 'Consent Confirmed:', 'astra-child' ); ?></strong> <?php esc_html_e( 'Yes — Applicant confirmed GDPR/Privacy consent at time of submission.', 'astra-child' ); ?></div>
			<div><strong><?php esc_html_e( 'Candidate IP Address:', 'astra-child' ); ?></strong> <code><?php echo esc_html( $ip_addr ? $ip_addr : 'Unknown' ); ?></code></div>
			<div>
				<strong><?php esc_html_e( 'Admin Email Notification:', 'astra-child' ); ?></strong> 
				<?php
				if ( 'sent' === $admin_mail ) {
					echo '<span style="color:#137333; font-weight:600;">' . esc_html__( 'Delivered successfully via wp_mail()', 'astra-child' ) . '</span>';
				} elseif ( 'disabled' === $admin_mail ) {
					echo '<span style="color:#888;">' . esc_html__( 'Disabled in settings', 'astra-child' ) . '</span>';
				} elseif ( 'failed' === $admin_mail ) {
					echo '<span style="color:#C5221F; font-weight:600;">' . esc_html__( 'Failed to send:', 'astra-child' ) . ' ' . esc_html( $admin_err ) . '</span>';
				} else {
					echo '&mdash;';
				}
				?>
			</div>
			<div>
				<strong><?php esc_html_e( 'Applicant Confirmation Email:', 'astra-child' ); ?></strong>
				<?php
				if ( 'sent' === $ack_mail ) {
					echo '<span style="color:#137333; font-weight:600;">' . esc_html__( 'Sent to candidate', 'astra-child' ) . '</span>';
				} elseif ( 'disabled' === $ack_mail ) {
					echo '<span style="color:#888;">' . esc_html__( 'Disabled in settings', 'astra-child' ) . '</span>';
				} elseif ( 'failed' === $ack_mail ) {
					echo '<span style="color:#C5221F;">' . esc_html__( 'Failed to send', 'astra-child' ) . '</span>';
				} else {
					echo '&mdash;';
				}
				?>
			</div>
		</div>

	</div>
	<?php
}

function bi_render_application_actions_meta_box( $post ) {
	wp_nonce_field( 'bi_save_application_action', 'bi_app_meta_nonce' );

	$current_status = get_post_meta( $post->ID, '_bi_app_status', true );
	if ( ! $current_status ) {
		$current_status = 'new';
	}
	$statuses = bi_get_application_statuses();
	$notes    = get_post_meta( $post->ID, '_bi_app_notes', true );
	?>
	<div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
		<p>
			<label for="bi_app_status" style="display:block; font-weight:700; margin-bottom:6px;">
				<?php esc_html_e( 'Application Status:', 'astra-child' ); ?>
			</label>
			<select name="bi_app_status" id="bi_app_status" style="width:100%; font-size:14px; height:36px;">
				<?php foreach ( $statuses as $key => $st ) : ?>
					<option value="<?php echo esc_attr( $key ); ?>" <?php selected( $current_status, $key ); ?>>
						<?php echo esc_html( $st['label'] ); ?>
					</option>
				<?php endforeach; ?>
			</select>
		</p>

		<p style="margin-top:16px;">
			<label for="bi_app_notes" style="display:block; font-weight:700; margin-bottom:6px;">
				<?php esc_html_e( 'Internal Recruitment Notes:', 'astra-child' ); ?>
			</label>
			<textarea name="bi_app_notes" id="bi_app_notes" rows="4" style="width:100%; font-size:13px; line-height:1.5;" placeholder="<?php esc_attr_e( 'Add internal notes about interview rounds, assessment scores, or feedback...', 'astra-child' ); ?>"><?php echo esc_textarea( $notes ); ?></textarea>
		</p>

		<div style="padding-top:12px; border-top:1px solid #E5E5E5; display:flex; justify-content:space-between; align-items:center;">
			<a href="<?php echo esc_url( get_delete_post_link( $post->ID ) ); ?>" class="submitdelete deletion" onclick="return confirm('<?php esc_attr_e( 'Are you sure you want to permanently delete this application and its uploaded resume?', 'astra-child' ); ?>');" style="color:#C5221F; text-decoration:underline;">
				<?php esc_html_e( 'Delete Application', 'astra-child' ); ?>
			</a>
			<button type="submit" class="button button-primary" style="background:#000000; border-color:#000000;">
				<?php esc_html_e( 'Update Application', 'astra-child' ); ?>
			</button>
		</div>
	</div>
	<?php
}

/**
 * Save meta box values when application is updated in admin.
 */
function bi_save_application_meta( $post_id ) {
	if ( ! isset( $_POST['bi_app_meta_nonce'] ) || ! wp_verify_nonce( $_POST['bi_app_meta_nonce'], 'bi_save_application_action' ) ) {
		return;
	}

	if ( defined( 'DOING_AUTOSAVE' ) && DOING_AUTOSAVE ) {
		return;
	}

	if ( ! current_user_can( 'edit_post', $post_id ) ) {
		return;
	}

	if ( isset( $_POST['bi_app_status'] ) ) {
		$valid_statuses = array_keys( bi_get_application_statuses() );
		$status = sanitize_key( $_POST['bi_app_status'] );
		if ( in_array( $status, $valid_statuses, true ) ) {
			update_post_meta( $post_id, '_bi_app_status', $status );
		}
	}

	if ( isset( $_POST['bi_app_notes'] ) ) {
		update_post_meta( $post_id, '_bi_app_notes', sanitize_textarea_field( wp_unslash( $_POST['bi_app_notes'] ) ) );
	}
}
add_action( 'save_post_bi_application', 'bi_save_application_meta' );

/**
 * --------------------------------------------------------------------------
 * 5. Secure Access-Controlled Resume Download Handler
 * --------------------------------------------------------------------------
 */
function bi_handle_secure_resume_download() {
	if ( ! is_user_logged_in() ) {
		wp_die( esc_html__( 'Access denied. You must be logged into WordPress to download resumes.', 'astra-child' ), 403 );
	}

	if ( ! current_user_can( 'edit_posts' ) ) {
		wp_die( esc_html__( 'Unauthorized. Only recruitment staff and administrators may download resumes.', 'astra-child' ), 403 );
	}

	$post_id = isset( $_GET['id'] ) ? absint( $_GET['id'] ) : 0;
	if ( ! $post_id || 'bi_application' !== get_post_type( $post_id ) ) {
		wp_die( esc_html__( 'Invalid application ID.', 'astra-child' ), 404 );
	}

	check_admin_referer( 'bi_download_resume_' . $post_id );

	$file_path = get_post_meta( $post_id, '_bi_app_resume_path', true );
	$file_name = get_post_meta( $post_id, '_bi_app_resume_filename', true );
	$mime_type = get_post_meta( $post_id, '_bi_app_resume_mime', true );

	if ( ! $file_path || ! file_exists( $file_path ) ) {
		wp_die( esc_html__( 'Resume file was not found on the server.', 'astra-child' ), 404 );
	}

	// Double-check real path is inside bi-resumes directory
	$resumes_dir = bi_get_resume_upload_dir();
	$real_path   = realpath( $file_path );
	$real_dir    = realpath( $resumes_dir );

	if ( ! $real_path || strpos( $real_path, $real_dir ) !== 0 ) {
		wp_die( esc_html__( 'Security violation: illegal file path.', 'astra-child' ), 403 );
	}

	if ( ! $file_name ) {
		$file_name = basename( $file_path );
	}
	if ( ! $mime_type ) {
		$mime_type = 'application/octet-stream';
	}

	// Clean output buffers
	if ( ob_get_level() ) {
		ob_end_clean();
	}

	header( 'Content-Description: File Transfer' );
	header( 'Content-Type: ' . $mime_type );
	header( 'Content-Disposition: attachment; filename="' . sanitize_file_name( $file_name ) . '"' );
	header( 'Content-Transfer-Encoding: binary' );
	header( 'Expires: 0' );
	header( 'Cache-Control: must-revalidate, post-check=0, pre-check=0' );
	header( 'Pragma: public' );
	header( 'Content-Length: ' . filesize( $file_path ) );

	readfile( $file_path );
	exit;
}
add_action( 'admin_post_bi_download_resume', 'bi_handle_secure_resume_download' );

/**
 * Clean up physical resume file when application is permanently deleted.
 */
function bi_cleanup_resume_file_on_delete( $post_id ) {
	if ( 'bi_application' !== get_post_type( $post_id ) ) {
		return;
	}

	$file_path = get_post_meta( $post_id, '_bi_app_resume_path', true );
	if ( $file_path && file_exists( $file_path ) ) {
		$resumes_dir = bi_get_resume_upload_dir();
		$real_path   = realpath( $file_path );
		$real_dir    = realpath( $resumes_dir );

		if ( $real_path && strpos( $real_path, $real_dir ) === 0 ) {
			@unlink( $file_path );
		}
	}
}
add_action( 'before_delete_post', 'bi_cleanup_resume_file_on_delete' );

/**
 * --------------------------------------------------------------------------
 * 6. Configurable Career Application Settings Page
 * --------------------------------------------------------------------------
 */
function bi_get_careers_settings() {
	$defaults = array(
		'recipient_email'        => get_option( 'admin_email', 'hr@betterinsights.in' ),
		'additional_recipients'  => '',
		'enable_notifications'   => 1,
		'email_subject'          => '[New Job Application] {applicant_name} - {position}',
		'enable_applicant_ack'   => 1,
		'applicant_ack_subject'  => 'Application Received: {position} - Better Insights',
		'applicant_ack_message'  => "Hi {applicant_name},\n\nThank you for applying for the {position} role at Better Insights.\n\nWe have received your application and resume. Our recruitment and technical leadership team will review your qualifications and reach out if there is a match.\n\nBest regards,\nThe Better Insights Talent Team\nhttps://betterinsights.in",
	);

	$saved = get_option( 'bi_careers_settings', array() );
	return wp_parse_args( $saved, $defaults );
}

function bi_register_careers_settings_page() {
	add_submenu_page(
		'edit.php?post_type=bi_application',
		__( 'Career Application Settings', 'astra-child' ),
		__( 'Settings', 'astra-child' ),
		'manage_options',
		'bi-career-settings',
		'bi_render_careers_settings_page'
	);
}
add_action( 'admin_menu', 'bi_register_careers_settings_page' );

function bi_render_careers_settings_page() {
	if ( ! current_user_can( 'manage_options' ) ) {
		wp_die( esc_html__( 'Unauthorized access.', 'astra-child' ) );
	}

	$settings = bi_get_careers_settings();
	$message  = '';
	$msg_type = 'updated';

	// Save Settings Form
	if ( isset( $_POST['bi_save_settings'] ) && check_admin_referer( 'bi_careers_settings_nonce' ) ) {
		$settings['recipient_email']       = sanitize_email( wp_unslash( $_POST['recipient_email'] ) );
		$settings['additional_recipients'] = sanitize_textarea_field( wp_unslash( $_POST['additional_recipients'] ) );
		$settings['enable_notifications']  = isset( $_POST['enable_notifications'] ) ? 1 : 0;
		$settings['email_subject']         = sanitize_text_field( wp_unslash( $_POST['email_subject'] ) );
		$settings['enable_applicant_ack']  = isset( $_POST['enable_applicant_ack'] ) ? 1 : 0;
		$settings['applicant_ack_subject'] = sanitize_text_field( wp_unslash( $_POST['applicant_ack_subject'] ) );
		$settings['applicant_ack_message'] = sanitize_textarea_field( wp_unslash( $_POST['applicant_ack_message'] ) );

		update_option( 'bi_careers_settings', $settings );
		$message = __( 'Career application settings updated successfully.', 'astra-child' );
	}

	// Send Test Email
	if ( isset( $_POST['bi_test_email'] ) && check_admin_referer( 'bi_careers_settings_nonce' ) ) {
		$recipient = ! empty( $_POST['recipient_email'] ) ? sanitize_email( wp_unslash( $_POST['recipient_email'] ) ) : $settings['recipient_email'];
		$test_subject = '[Test] Better Insights Career Application System';
		$test_body    = "This is a verification email from the Better Insights Career Application System.\n\nIf you are reading this, your WordPress mail delivery configuration is operating successfully.\n\nTimestamp: " . current_time( 'mysql' );
		$test_headers = array( 'From: Better Insights Careers <no-reply@betterinsights.in>' );

		$mail_result = wp_mail( $recipient, $test_subject, $test_body, $test_headers );

		if ( $mail_result ) {
			$message  = sprintf( __( 'Test email sent successfully to %s!', 'astra-child' ), esc_html( $recipient ) );
			$msg_type = 'updated';
		} else {
			$message  = sprintf( __( 'Could not deliver test email to %s. Please check your WordPress mail / SMTP configuration.', 'astra-child' ), esc_html( $recipient ) );
			$msg_type = 'error';
		}
	}
	?>
	<div class="wrap" style="max-width:850px;">
		<h1 style="margin-bottom:16px;"><?php esc_html_e( 'Career Application Settings', 'astra-child' ); ?></h1>

		<?php if ( $message ) : ?>
			<div class="notice notice-<?php echo esc_attr( $msg_type ); ?> is-dismissible">
				<p><strong><?php echo esc_html( $message ); ?></strong></p>
			</div>
		<?php endif; ?>

		<div style="background:#FFFFFF; border:1px solid #D0D3DA; border-radius:8px; padding:24px 32px; box-shadow:0 1px 3px rgba(0,0,0,0.04);">
			<form method="post" action="">
				<?php wp_nonce_field( 'bi_careers_settings_nonce' ); ?>

				<h2 style="font-size:18px; border-bottom:1px solid #E5E5E5; padding-bottom:10px; margin-top:0;">
					<?php esc_html_e( 'Recruitment Team Notifications', 'astra-child' ); ?>
				</h2>
				<table class="form-table">
					<tr>
						<th scope="row">
							<label for="enable_notifications"><?php esc_html_e( 'Admin Notifications', 'astra-child' ); ?></label>
						</th>
						<td>
							<label>
								<input type="checkbox" name="enable_notifications" id="enable_notifications" value="1" <?php checked( $settings['enable_notifications'], 1 ); ?>>
								<?php esc_html_e( 'Send email notification to recruiters whenever a new application is submitted', 'astra-child' ); ?>
							</label>
						</td>
					</tr>
					<tr>
						<th scope="row">
							<label for="recipient_email"><?php esc_html_e( 'Primary Recipient Email', 'astra-child' ); ?></label>
						</th>
						<td>
							<input type="email" name="recipient_email" id="recipient_email" value="<?php echo esc_attr( $settings['recipient_email'] ); ?>" class="regular-text" required>
							<p class="description"><?php esc_html_e( 'Main email address that will receive candidate alerts. Defaults to the site admin email.', 'astra-child' ); ?></p>
						</td>
					</tr>
					<tr>
						<th scope="row">
							<label for="additional_recipients"><?php esc_html_e( 'Additional Recipients', 'astra-child' ); ?></label>
						</th>
						<td>
							<textarea name="additional_recipients" id="additional_recipients" rows="2" class="large-text" placeholder="recruiter1@betterinsights.in, hiring-manager@betterinsights.in"><?php echo esc_textarea( $settings['additional_recipients'] ); ?></textarea>
							<p class="description"><?php esc_html_e( 'Optional comma-separated list of secondary recruiters or department heads to CC.', 'astra-child' ); ?></p>
						</td>
					</tr>
					<tr>
						<th scope="row">
							<label for="email_subject"><?php esc_html_e( 'Notification Subject', 'astra-child' ); ?></label>
						</th>
						<td>
							<input type="text" name="email_subject" id="email_subject" value="<?php echo esc_attr( $settings['email_subject'] ); ?>" class="large-text">
							<p class="description"><?php esc_html_e( 'Available tags: {applicant_name}, {position}', 'astra-child' ); ?></p>
						</td>
					</tr>
				</table>

				<h2 style="font-size:18px; border-bottom:1px solid #E5E5E5; padding-bottom:10px; margin-top:32px;">
					<?php esc_html_e( 'Applicant Confirmation Email', 'astra-child' ); ?>
				</h2>
				<table class="form-table">
					<tr>
						<th scope="row">
							<label for="enable_applicant_ack"><?php esc_html_e( 'Candidate Acknowledgement', 'astra-child' ); ?></label>
						</th>
						<td>
							<label>
								<input type="checkbox" name="enable_applicant_ack" id="enable_applicant_ack" value="1" <?php checked( $settings['enable_applicant_ack'], 1 ); ?>>
								<?php esc_html_e( 'Automatically send a confirmation receipt email to the applicant upon submission', 'astra-child' ); ?>
							</label>
						</td>
					</tr>
					<tr>
						<th scope="row">
							<label for="applicant_ack_subject"><?php esc_html_e( 'Candidate Email Subject', 'astra-child' ); ?></label>
						</th>
						<td>
							<input type="text" name="applicant_ack_subject" id="applicant_ack_subject" value="<?php echo esc_attr( $settings['applicant_ack_subject'] ); ?>" class="large-text">
							<p class="description"><?php esc_html_e( 'Available tags: {applicant_name}, {position}', 'astra-child' ); ?></p>
						</td>
					</tr>
					<tr>
						<th scope="row">
							<label for="applicant_ack_message"><?php esc_html_e( 'Candidate Email Message', 'astra-child' ); ?></label>
						</th>
						<td>
							<textarea name="applicant_ack_message" id="applicant_ack_message" rows="7" class="large-text"><?php echo esc_textarea( $settings['applicant_ack_message'] ); ?></textarea>
							<p class="description"><?php esc_html_e( 'Available tags: {applicant_name}, {position}', 'astra-child' ); ?></p>
						</td>
					</tr>
				</table>

				<p class="submit" style="display:flex; align-items:center; gap:16px;">
					<button type="submit" name="bi_save_settings" class="button button-primary button-large" style="background:#000000; border-color:#000000;">
						<?php esc_html_e( 'Save Settings', 'astra-child' ); ?>
					</button>
					<button type="submit" name="bi_test_email" class="button button-secondary button-large" onclick="return confirm('<?php esc_attr_e( 'Send a test email now?', 'astra-child' ); ?>');">
						<?php esc_html_e( 'Send Test Email', 'astra-child' ); ?>
					</button>
				</p>
			</form>
		</div>
	</div>
	<?php
}

/**
 * --------------------------------------------------------------------------
 * 7. Frontend AJAX Application Submission Handler
 * --------------------------------------------------------------------------
 */
function bi_handle_career_application_submission() {
	// 1. Verify Nonce
	if ( ! check_ajax_referer( 'bi_careers_nonce', 'nonce', false ) ) {
		wp_send_json_error(
			array(
				'message' => __( 'Security verification failed. Please refresh the page and try again.', 'astra-child' ),
			),
			403
		);
	}

	// 2. Honeypot check (Automated spam bots)
	if ( ! empty( $_POST['bi_hp_career'] ) ) {
		wp_send_json_success(
			array(
				'message' => __( 'Thank you! Your application has been submitted successfully.', 'astra-child' ),
			)
		);
	}

	// 3. Rate limiting (Max 5 submissions per 15 minutes per IP)
	$ip = isset( $_SERVER['REMOTE_ADDR'] ) ? sanitize_text_field( wp_unslash( $_SERVER['REMOTE_ADDR'] ) ) : '0.0.0.0';
	$rate_transient_key = 'bi_career_rate_' . md5( $ip );
	$submit_count = (int) get_transient( $rate_transient_key );

	if ( $submit_count >= 5 ) {
		wp_send_json_error(
			array(
				'message' => __( 'Too many submissions received from your connection. Please wait a few moments before trying again.', 'astra-child' ),
			),
			429
		);
	}
	set_transient( $rate_transient_key, $submit_count + 1, 15 * MINUTE_IN_SECONDS );

	$errors = array();

	// 4. Sanitize and validate textual fields
	$full_name    = isset( $_POST['full_name'] ) ? sanitize_text_field( wp_unslash( $_POST['full_name'] ) ) : '';
	$email        = isset( $_POST['email'] ) ? sanitize_email( wp_unslash( $_POST['email'] ) ) : '';
	$phone        = isset( $_POST['phone'] ) ? sanitize_text_field( wp_unslash( $_POST['phone'] ) ) : '';
	$position     = isset( $_POST['position'] ) ? sanitize_text_field( wp_unslash( $_POST['position'] ) ) : '';
	$linkedin     = isset( $_POST['linkedin'] ) ? esc_url_raw( wp_unslash( $_POST['linkedin'] ) ) : '';
	$cover_letter = isset( $_POST['cover_letter'] ) ? sanitize_textarea_field( wp_unslash( $_POST['cover_letter'] ) ) : '';
	$consent      = isset( $_POST['consent'] ) ? (bool) $_POST['consent'] : false;

	if ( empty( $full_name ) || mb_strlen( $full_name ) < 2 ) {
		$errors['full_name'] = __( 'Please enter your full name.', 'astra-child' );
	}

	if ( empty( $email ) || ! is_email( $email ) ) {
		$errors['email'] = __( 'Please enter a valid email address.', 'astra-child' );
	}

	if ( empty( $phone ) || mb_strlen( $phone ) < 6 ) {
		$errors['phone'] = __( 'Please enter a valid phone number.', 'astra-child' );
	}

	if ( empty( $position ) ) {
		$errors['position'] = __( 'Please specify the position you are applying for.', 'astra-child' );
	}

	if ( ! $consent ) {
		$errors['consent'] = __( 'You must consent to the processing of your application data to proceed.', 'astra-child' );
	}

	// Validate LinkedIn format if provided
	if ( ! empty( $linkedin ) && ! filter_var( $linkedin, FILTER_VALIDATE_URL ) ) {
		$errors['linkedin'] = __( 'Please enter a valid LinkedIn URL (e.g. https://linkedin.com/in/yourname).', 'astra-child' );
	}

	// 5. File upload validation (Resume)
	if ( empty( $_FILES['resume'] ) || ! isset( $_FILES['resume']['error'] ) || UPLOAD_ERR_NO_FILE === $_FILES['resume']['error'] ) {
		$errors['resume'] = __( 'Please attach your Resume/CV (PDF or DOC/DOCX).', 'astra-child' );
	} elseif ( UPLOAD_ERR_OK !== $_FILES['resume']['error'] ) {
		$errors['resume'] = __( 'File upload encountered an error. Please try again.', 'astra-child' );
	} else {
		$file = $_FILES['resume'];

		// File Size check: Max 10MB
		$max_size = 10 * 1024 * 1024;
		if ( $file['size'] > $max_size ) {
			$errors['resume'] = __( 'File size exceeds maximum limit of 10 MB.', 'astra-child' );
		}

		// File extension & MIME validation
		$allowed_exts = array( 'pdf', 'doc', 'docx' );
		$file_ext     = strtolower( pathinfo( $file['name'], PATHINFO_EXTENSION ) );

		if ( ! in_array( $file_ext, $allowed_exts, true ) ) {
			$errors['resume'] = __( 'Invalid file format. Only PDF, DOC, and DOCX files are permitted.', 'astra-child' );
		}

		// Double-check real MIME type
		$finfo = finfo_open( FILEINFO_MIME_TYPE );
		$real_mime = finfo_file( $finfo, $file['tmp_name'] );
		finfo_close( $finfo );

		$allowed_mimes = array(
			'application/pdf',
			'application/msword',
			'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
			'application/octet-stream', // Some Windows systems send docx as octet-stream
		);

		if ( ! in_array( $real_mime, $allowed_mimes, true ) ) {
			$errors['resume'] = __( 'The uploaded file does not match approved document types (PDF, DOC, DOCX).', 'astra-child' );
		}
	}

	// Return validation errors if any
	if ( ! empty( $errors ) ) {
		wp_send_json_error(
			array(
				'message' => __( 'Please correct the errors in the form before submitting.', 'astra-child' ),
				'errors'  => $errors,
			),
			400
		);
	}

	// 6. Securely Move Uploaded Resume File
	$resumes_dir = bi_get_resume_upload_dir();
	$orig_name   = sanitize_file_name( $file['name'] );
	$file_token  = wp_generate_password( 16, false );
	$safe_name   = 'resume_' . $file_token . '_' . $orig_name;
	$target_path = trailingslashit( $resumes_dir ) . $safe_name;

	if ( ! move_uploaded_file( $file['tmp_name'], $target_path ) ) {
		wp_send_json_error(
			array(
				'message' => __( 'Could not store resume file securely. Please contact recruitment at hr@betterinsights.in.', 'astra-child' ),
			),
			500
		);
	}

	// Format file size
	$bytes = filesize( $target_path );
	if ( $bytes >= 1048576 ) {
		$formatted_size = number_format( $bytes / 1048576, 2 ) . ' MB';
	} else {
		$formatted_size = number_format( $bytes / 1024, 1 ) . ' KB';
	}

	// 7. Persist Application to Database via CPT 'bi_application'
	$post_title = sprintf( '%s — %s', $full_name, $position );
	$post_id    = wp_insert_post(
		array(
			'post_type'   => 'bi_application',
			'post_title'  => wp_strip_all_tags( $post_title ),
			'post_status' => 'publish',
		)
	);

	if ( is_wp_error( $post_id ) ) {
		// Clean up file if DB insert fails
		@unlink( $target_path );
		wp_send_json_error(
			array(
				'message' => __( 'Could not save application to system. Please try again.', 'astra-child' ),
			),
			500
		);
	}

	// Save Application Metadata
	update_post_meta( $post_id, '_bi_app_full_name', $full_name );
	update_post_meta( $post_id, '_bi_app_email', $email );
	update_post_meta( $post_id, '_bi_app_phone', $phone );
	update_post_meta( $post_id, '_bi_app_position', $position );
	update_post_meta( $post_id, '_bi_app_linkedin', $linkedin );
	update_post_meta( $post_id, '_bi_app_cover_letter', $cover_letter );
	update_post_meta( $post_id, '_bi_app_resume_filename', $orig_name );
	update_post_meta( $post_id, '_bi_app_resume_stored_name', $safe_name );
	update_post_meta( $post_id, '_bi_app_resume_path', $target_path );
	update_post_meta( $post_id, '_bi_app_resume_size', $formatted_size );
	update_post_meta( $post_id, '_bi_app_resume_mime', $real_mime );
	update_post_meta( $post_id, '_bi_app_consent', 'yes' );
	update_post_meta( $post_id, '_bi_app_status', 'new' );
	update_post_meta( $post_id, '_bi_app_ip', $ip );
	update_post_meta( $post_id, '_bi_app_user_agent', isset( $_SERVER['HTTP_USER_AGENT'] ) ? sanitize_text_field( wp_unslash( $_SERVER['HTTP_USER_AGENT'] ) ) : '' );
	update_post_meta( $post_id, '_bi_app_submitted_at', current_time( 'mysql' ) );

	// 8. Process Email Notifications
	$settings = bi_get_careers_settings();

	// A. Admin / Recruiter Notification
	if ( ! empty( $settings['enable_notifications'] ) ) {
		$recipients = array( $settings['recipient_email'] );
		if ( ! empty( $settings['additional_recipients'] ) ) {
			$extras = explode( ',', $settings['additional_recipients'] );
			foreach ( $extras as $extra ) {
				$clean_extra = sanitize_email( trim( $extra ) );
				if ( is_email( $clean_extra ) ) {
					$recipients[] = $clean_extra;
				}
			}
		}

		$admin_subject = str_replace(
			array( '{applicant_name}', '{position}' ),
			array( $full_name, $position ),
			$settings['email_subject']
		);

		$dashboard_url = admin_url( 'post.php?post=' . $post_id . '&action=edit' );

		$headers = array(
			'Content-Type: text/html; charset=UTF-8',
			'From: Better Insights Careers <no-reply@betterinsights.in>',
			'Reply-To: ' . $full_name . ' <' . $email . '>',
		);

		$admin_html  = '<div style="font-family:-apple-system,BlinkMacSystemFont,\'Segoe UI\',Roboto,sans-serif; max-width:620px; margin:0 auto; padding:24px; border:1px solid #D0D3DA; border-radius:10px; background:#FFFFFF;">';
		$admin_html .= '<div style="background-color:#000000; color:#FFFFFF; padding:18px 24px; border-radius:8px; margin-bottom:24px;">';
		$admin_html .= '<h2 style="margin:0; font-size:20px; font-weight:700; color:#FFFFFF;">Better Insights &bull; New Job Application</h2>';
		$admin_html .= '<p style="margin:6px 0 0; font-size:13px; color:#F3F2EF;">Role: <strong>' . esc_html( $position ) . '</strong></p>';
		$admin_html .= '</div>';

		$admin_html .= '<table style="width:100%; border-collapse:collapse; font-size:14px; line-height:1.6;">';
		$admin_html .= '<tr><td style="padding:10px 12px; font-weight:600; color:#6A6A6A; width:35%; border-bottom:1px solid #EBECEF;">Candidate Name:</td><td style="padding:10px 12px; color:#000000; border-bottom:1px solid #EBECEF; font-weight:700;">' . esc_html( $full_name ) . '</td></tr>';
		$admin_html .= '<tr><td style="padding:10px 12px; font-weight:600; color:#6A6A6A; border-bottom:1px solid #EBECEF;">Email Address:</td><td style="padding:10px 12px; color:#000000; border-bottom:1px solid #EBECEF;"><a href="mailto:' . esc_attr( $email ) . '">' . esc_html( $email ) . '</a></td></tr>';
		$admin_html .= '<tr><td style="padding:10px 12px; font-weight:600; color:#6A6A6A; border-bottom:1px solid #EBECEF;">Phone Number:</td><td style="padding:10px 12px; color:#000000; border-bottom:1px solid #EBECEF;"><a href="tel:' . esc_attr( $phone ) . '">' . esc_html( $phone ) . '</a></td></tr>';
		$admin_html .= '<tr><td style="padding:10px 12px; font-weight:600; color:#6A6A6A; border-bottom:1px solid #EBECEF;">Position:</td><td style="padding:10px 12px; color:#000000; border-bottom:1px solid #EBECEF;">' . esc_html( $position ) . '</td></tr>';
		if ( $linkedin ) {
			$admin_html .= '<tr><td style="padding:10px 12px; font-weight:600; color:#6A6A6A; border-bottom:1px solid #EBECEF;">LinkedIn:</td><td style="padding:10px 12px; color:#000000; border-bottom:1px solid #EBECEF;"><a href="' . esc_url( $linkedin ) . '" target="_blank">' . esc_html( $linkedin ) . '</a></td></tr>';
		}
		$admin_html .= '<tr><td style="padding:10px 12px; font-weight:600; color:#6A6A6A; border-bottom:1px solid #EBECEF;">Resume File:</td><td style="padding:10px 12px; color:#000000; border-bottom:1px solid #EBECEF;"><strong>' . esc_html( $orig_name ) . '</strong> (' . esc_html( $formatted_size ) . ')</td></tr>';
		if ( $cover_letter ) {
			$admin_html .= '<tr><td style="padding:10px 12px; font-weight:600; color:#6A6A6A; border-bottom:1px solid #EBECEF; vertical-align:top;">Cover Note:</td><td style="padding:10px 12px; color:#000000; border-bottom:1px solid #EBECEF;">' . nl2br( esc_html( $cover_letter ) ) . '</td></tr>';
		}
		$admin_html .= '<tr><td style="padding:10px 12px; font-weight:600; color:#6A6A6A;">Submitted At:</td><td style="padding:10px 12px; color:#000000;">' . esc_html( current_time( 'F j, Y, g:i a' ) ) . '</td></tr>';
		$admin_html .= '</table>';

		$admin_html .= '<div style="margin-top:24px; text-align:center;">';
		$admin_html .= '<a href="' . esc_url( $dashboard_url ) . '" style="display:inline-block; background:#000000; color:#FFFFFF; padding:12px 28px; text-decoration:none; border-radius:999px; font-weight:700; font-size:14px;">Review Application & Download Resume &rarr;</a>';
		$admin_html .= '</div>';
		$admin_html .= '</div>';

		// Dispatch via wp_mail
		$mail_ok = wp_mail( $recipients, $admin_subject, $admin_html, $headers );

		if ( $mail_ok ) {
			update_post_meta( $post_id, '_bi_app_admin_email_status', 'sent' );
		} else {
			update_post_meta( $post_id, '_bi_app_admin_email_status', 'failed' );
			update_post_meta( $post_id, '_bi_app_admin_email_error', 'wp_mail() returned false (server mail transport may not be configured)' );
		}
	} else {
		update_post_meta( $post_id, '_bi_app_admin_email_status', 'disabled' );
	}

	// B. Applicant Confirmation / Acknowledgement Email
	if ( ! empty( $settings['enable_applicant_ack'] ) ) {
		$ack_subject = str_replace(
			array( '{applicant_name}', '{position}' ),
			array( $full_name, $position ),
			$settings['applicant_ack_subject']
		);

		$ack_body = str_replace(
			array( '{applicant_name}', '{position}', '{site_name}' ),
			array( $full_name, $position, get_bloginfo( 'name' ) ),
			$settings['applicant_ack_message']
		);

		$ack_headers = array(
			'From: Better Insights Careers <no-reply@betterinsights.in>',
		);

		$ack_ok = wp_mail( $email, $ack_subject, $ack_body, $ack_headers );

		if ( $ack_ok ) {
			update_post_meta( $post_id, '_bi_app_applicant_email_status', 'sent' );
		} else {
			update_post_meta( $post_id, '_bi_app_applicant_email_status', 'failed' );
		}
	} else {
		update_post_meta( $post_id, '_bi_app_applicant_email_status', 'disabled' );
	}

	// 9. Send Successful JSON Response
	wp_send_json_success(
		array(
			'message'   => sprintf(
				__( 'Thank you, %s! Your application for the %s position has been successfully submitted. Our recruitment team will review your qualifications and contact you soon.', 'astra-child' ),
				esc_html( $full_name ),
				esc_html( $position )
			),
			'post_id'   => $post_id,
			'applicant' => $full_name,
			'position'  => $position,
		)
	);
}
add_action( 'wp_ajax_bi_submit_career_application', 'bi_handle_career_application_submission' );
add_action( 'wp_ajax_nopriv_bi_submit_career_application', 'bi_handle_career_application_submission' );

/**
 * --------------------------------------------------------------------------
 * 8. Enqueue Frontend Modal Assets on Careers Page
 * --------------------------------------------------------------------------
 */
function bi_enqueue_career_modal_assets() {
	$is_careers = is_page_template( 'page-careers.php' ) || is_page( 'careers' );

	if ( ! $is_careers ) {
		return;
	}

	$theme_dir = get_stylesheet_directory();
	$theme_uri = get_stylesheet_directory_uri();

	$css_file = $theme_dir . '/assets/css/career-modal.css';
	$js_file  = $theme_dir . '/assets/js/career-modal.js';

	wp_enqueue_style(
		'bi-career-modal',
		$theme_uri . '/assets/css/career-modal.css',
		array( 'bi-utility-pages' ),
		file_exists( $css_file ) ? (string) filemtime( $css_file ) : wp_get_theme()->get( 'Version' )
	);

	wp_enqueue_script(
		'bi-career-modal',
		$theme_uri . '/assets/js/career-modal.js',
		array(),
		file_exists( $js_file ) ? (string) filemtime( $js_file ) : wp_get_theme()->get( 'Version' ),
		true
	);

	wp_localize_script(
		'bi-career-modal',
		'bi_career_vars',
		array(
			'ajax_url'    => admin_url( 'admin-ajax.php' ),
			'nonce'       => wp_create_nonce( 'bi_careers_nonce' ),
			'privacy_url' => home_url( '/privacy-policy/' ),
			'i18n'        => array(
				'submitting'      => __( 'Submitting Application...', 'astra-child' ),
				'submit_btn'      => __( 'Submit Application', 'astra-child' ),
				'file_too_big'    => __( 'File size exceeds maximum limit of 10 MB.', 'astra-child' ),
				'invalid_ext'     => __( 'Invalid file format. Please upload a PDF, DOC, or DOCX document.', 'astra-child' ),
				'fill_required'   => __( 'Please complete all required fields.', 'astra-child' ),
				'server_error'    => __( 'An unexpected error occurred. Please try again or email hr@betterinsights.in directly.', 'astra-child' ),
			),
		)
	);
}
add_action( 'wp_enqueue_scripts', 'bi_enqueue_career_modal_assets', 30 );
