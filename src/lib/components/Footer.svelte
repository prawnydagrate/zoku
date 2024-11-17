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
	@import url("https://fonts.googleapis.com/css2?family=VT323&display=swap");

	#footer {
		margin-top: auto;
		width: 100%;
		min-height: 45px;
		font-family: "VT323", monospace;
		font-size: 16pt;
		display: flex;
		padding: 4px 24px 4px 24px;
		background-color: #ffffee;
		border-top: 1px solid #666;
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
