<template>
    <div class="morePage">
      <header>更多</header>
      <div class="more_body">

        <div class="more_cells">
          <div class="more_cell">
            <div class="more_hd">
              <label class="more_label" for="">电话提醒</label>
              <span>已开启</span>
            </div>
            <div class="more_ft">
              <mt-switch v-model="value" @change="handleChange">
              </mt-switch>
            </div>
          </div>
          <div class="more_cell">
            <div class="more_hd">
              <label class="more_label" for="">电话提醒</label>
              <span>已开启</span>
            </div>
            <div class="more_ft">
              <mt-switch v-model="value" @change="handleChange">
              </mt-switch>
            </div>
          </div>
        </div>

        <div class="more_cells">
          <div class="more_cell">
            <div class="more_hd">
              <label class="more_label" for="">他汀(阿托伐他汀)</label>
              <span>服用中</span>
            </div>
            <div class="more_ft">
              <mt-switch v-model="value" @change="handleChange">
              </mt-switch>
            </div>
          </div>
          <div class="more_cell">
            <div class="more_hd">
              <label class="more_label" for="">长效降压(氨氯地平)</label>
              <span>未服用</span>
            </div>
            <div class="more_ft">
              <mt-switch v-model="value" @change="handleChange">
              </mt-switch>
            </div>
          </div>
          <div class="more_cell">
            <div class="more_hd">
              <label class="more_label" for="">其他药品</label>
              <span>未服用</span>
            </div>
            <div class="more_ft">
              <mt-switch v-model="value" @change="handleChange">
              </mt-switch>
            </div>
          </div>
        </div>

        <div class="more_cells">
          <div class="more_cell">
            <div class="more_hd">
              <label class="more_label" for="">头像</label>
            </div>
            <div class="more_ft">
              <i class="header"></i>
            </div>
          </div>
          <div class="more_cell">
            <div class="more_hd">
              <label class="more_label" for="">姓名</label>
            </div>
            <div class="more_ft arrow">
              宋宝强先生
            </div>
          </div>
          <div class="more_cell">
            <div class="more_hd">
              <label class="more_label" for="">年龄</label>
            </div>
            <div class="more_ft arrow">
              35
            </div>
          </div>
          <div class="more_cell">
            <div class="more_hd">
              <label class="more_label" for="">性别</label>
            </div>
            <div class="more_ft arrow">
              女
            </div>
          </div>

          <div class="more_cell">
            <div class="more_hd">
              <label class="more_label" for="">手机号</label>
            </div>
            <div class="more_ft arrow">
              13810678245
            </div>
          </div>
        </div>

        <div class="more_cells">
          <div class="more_cell">
            <div class="more_hd">
              <label class="more_label" for="">重新绑定</label>
            </div>
            <div class="more_ft arrow">
              解绑当前医生，绑定新医生
            </div>
          </div>
        </div>
      </div>
    </div>
</template>
<style lang='scss' scoped>
    @import './more.scss';
</style>
<script src="./more"></script>
