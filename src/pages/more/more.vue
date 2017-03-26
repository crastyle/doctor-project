<template>
    <div class="morePage">
      <header>更多</header>
      <div class="more_body">

        <div class="more_cells">
          <mt-cell title="电话提醒">
            <span v-text="value">已开启</span>
            <mt-switch v-model="value" @change="handleChange">
            </mt-switch>
          </mt-cell>
          <mt-cell title="短信提醒">
            <span v-text="infoValue">已开启</span>
            <mt-switch v-model="infoValue" @change="handleChange">
            </mt-switch>
          </mt-cell>
        </div>

      </div>
    </div>
</template>
<style lang='scss' scoped>
    @import './more.scss';
</style>
<script src="./more"></script>
