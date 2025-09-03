<template>
  <div class="w-full max-h-[calc(100vh-64px)] overflow-auto flex flex-col gap-4 p-4 bg-gray-50 pb-16">
    <!-- 个人介绍区域 -->
    <section class="flex items-center bg-white rounded-lg p-4 shadow">
      <img
        class="w-16 h-16 rounded-full mr-6 border-2 border-gray-200"
        src="https://avatars.githubusercontent.com/u/2945774105?v=4"
        alt="avatar"
      />
      <div class="flex-1">
        <h2 class="text-xl font-bold mb-1">前端杂货铺（huozhiyan）</h2>
        <p class="mb-2 text-gray-600 text-sm">
          <span class="text-orange-700 font-bold">个人简介：</span>
          软件工程本 for QTU，校级奖学金 & 科技创新奖学金获得者。第十三届蓝桥杯-Web应用开发-山东省二等奖。
          CSDN前端领域优质创作者，阿里云社区专家博主。目前效力于中国工业软件事业！
        </p>
        <p class="mb-2 text-gray-600 text-sm">
          <span class="text-green-700 font-bold">其他：</span>
          前端开发工程师。热爱开源与分享，专注于 Vue3、React、TypeScript、Vite、Element
          Plus、Node.js、Express、Koa2、Three.js 等技术栈。你我成为大牛指日可待。
        </p>
        <div class="space-x-4 mt-5">
          <a href="https://github.com/huozhiyan/rich-vue3" target="_blank" class="text-blue-500 hover:underline"
            >GitHub（感谢star🌟）</a
          >
          <a href="https://zahuopu.blog.csdn.net/" class="text-blue-500 hover:underline">CSDN（我的博客）</a>
        </div>
      </div>
    </section>

    <!-- 项目背景区域 -->
    <section class="mx-auto w-full">
      <div class="bg-white rounded-lg shadow p-4">
        <div class="font-semibold text-base mb-1">项目背景</div>
        <p class="mb-2 text-sm">
          <b>rich-vue3</b> 是一个基于 Vite、 Vue3、TypeScript、Element Plus、 TailWind CSS 和 Pinia
          的开源前端解决方案平台，旨在为开发者提供一系列丰富且实用功能的最佳实践。
        </p>
        <ul class="list-disc pl-5 space-y-1 text-gray-700 text-sm">
          <li>🌈 现代化技术栈，代码简洁易维护</li>
          <li>🧩 丰富的业务组件和页面示例</li>
          <li>🔒 完善的权限管理与路由配置</li>
          <li>🎨 支持主题切换与响应式布局</li>
        </ul>
      </div>
    </section>

    <!-- 技术栈区域 -->
    <section class="mx-auto w-full">
      <div class="bg-white rounded-lg shadow p-4">
        <div class="font-semibold text-base mb-1">核心技术栈</div>
        <div class="flex flex-wrap gap-2 mt-1">
          <span class="px-2 py-0.5 rounded bg-green-100 text-green-700 text-xs">Vue3</span>
          <span class="px-2 py-0.5 rounded bg-blue-100 text-blue-700 text-xs">TypeScript</span>
          <span class="px-2 py-0.5 rounded bg-yellow-100 text-yellow-700 text-xs">Vite</span>
          <span class="px-2 py-0.5 rounded bg-red-100 text-red-700 text-xs">Element Plus</span>
          <span class="px-2 py-0.5 rounded bg-indigo-100 text-indigo-700 text-xs">Pinia</span>
          <span class="px-2 py-0.5 rounded bg-orange-100 text-orange-700 text-xs">TailWind CSS</span>
          <span class="px-2 py-0.5 rounded bg-gray-100 text-gray-700 text-xs">Unocss</span>
          <span class="px-2 py-0.5 rounded bg-purple-100 text-purple-700 text-xs">优秀的第三方库</span>
        </div>
      </div>
    </section>

    <!-- 功能介绍区域 -->
    <section class="mx-auto w-full">
      <div class="bg-white rounded-lg shadow p-4">
        <div class="font-semibold text-base mb-1">内容/功能介绍</div>
        <ul class="list-disc pl-5 space-y-1 text-gray-700 text-sm">
          <li>🧩 手撕官方文档</li>
          <li>🧩 视频处理工具</li>
          <li>🧩 100个小知识</li>
          <li>🧩 LeetCode算法</li>
          <li>🧩 设计模式</li>
          <li>🧩 更多内容敬请期待...</li>
        </ul>
      </div>
    </section>
  </div>
</template>
