</div>

<!-- Base scripts -->
<script>
  if (typeof jQuery === "undefined") {
    document.write("<script src='<?= $_PATH->get('Jquery', 'url') ?>'><\/script>");
  }
</script>
<script src="<?= $_PATH->get('Jquery UI Custom', 'url') ?>"></script>
<script src="<?= $_PATH->get('Collector JS', 'url') ?>"></script>

<!-- Additional scripts -->
<?php if (isset($addedScripts)): foreach ($addedScripts as $additionalScript): ?>
<script src='<?= $additionalScript ?>'> </script>
<?php endforeach; endif; ?>

</body></html>
