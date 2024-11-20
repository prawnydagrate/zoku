<script>
	import githubIcon from "$lib/assets/github.svg";
</script>

<footer id="footer">
	<!-- spacer -->
	<div style="width: 8px"></div>
	<div class="row">
		Source code:
		<a
			class="row"
			href="https://github.com/prawnydagrate/zoku"
			target="_blank"
			rel="noopener noreferrer"
			aria-label="GitHub"
		>
			<img src={githubIcon} alt="GitHub" />
		</a>
	</div>
</footer>

<style>
	#footer {
		flex-shrink: 0;
		display: flex;

		width: 100%;
		height: 45px;
		padding: 4px 24px 4px 24px;

		border-top: 1px solid #666;
		background-color: #ffffee;

		font-family: "VT323", monospace;
		font-size: 16pt;
	}

	#footer .row {
		display: flex;
		align-items: center;
		justify-content: center;
	}

	#footer .row * {
		margin: 4px;
	}

	#footer img {
		width: 24px;
	}
</style>
